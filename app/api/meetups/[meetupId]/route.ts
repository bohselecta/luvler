import { auth } from '@clerk/nextjs/server'
import { head } from '@vercel/blob'
import { VirtualMeetup } from '@/lib/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { meetupId: string } }
) {
  try {
    const meetupId = params.meetupId

    // Get meetup from Vercel Blob
    const meetupKey = `meetups/${meetupId}.json`

    try {
      const { blobs } = await head(meetupKey)
      const response = await fetch(blobs.url)
      const meetup: VirtualMeetup = await response.json()

      // Check if user can access this meetup (public for now, but could add privacy later)
      const a = await auth()
      const isParticipant = meetup.participants.some(p => p.userId === a.userId)
      const isHost = meetup.hostId === a.userId

      return new Response(JSON.stringify({
        success: true,
        meetup,
        userRole: isHost ? 'host' : isParticipant ? 'participant' : 'visitor'
      }), { headers: { 'Content-Type': 'application/json' } })

    } catch (error) {
      return new Response(JSON.stringify({ error: 'Meetup not found' }), { status: 404 })
    }

  } catch (error) {
    console.error('Error fetching meetup:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch meetup' }), { status: 500 })
  }
}
