import { auth } from '@clerk/nextjs/server'
import { head, put, del } from '@vercel/blob'
import { VirtualMeetup, MeetupParticipant } from '@/lib/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const a = await auth()
    if (!a.userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const { meetupId, personalGoals = [] } = await request.json() as {
      meetupId: string
      personalGoals?: string[]
    }

    // Get existing meetup
    const meetupKey = `meetups/${meetupId}.json`
    let meetup: VirtualMeetup

    try {
      const { blobs } = await head(meetupKey)
      // Fetch the actual content
      const response = await fetch(blobs.url)
      meetup = await response.json()
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Meetup not found' }), { status: 404 })
    }

    // Check if user is already a participant
    const existingParticipant = meetup.participants.find(p => p.userId === a.userId)
    if (existingParticipant) {
      return new Response(JSON.stringify({
        success: true,
        message: 'Already joined this meetup',
        meetup: {
          id: meetup.id,
          title: meetup.title,
          scheduledFor: meetup.scheduledFor,
          status: meetup.status
        }
      }), { headers: { 'Content-Type': 'application/json' } })
    }

    // Check capacity
    if (meetup.participants.length >= meetup.settings.maxParticipants) {
      return new Response(JSON.stringify({ error: 'Meetup is full' }), { status: 409 })
    }

    // Add new participant
    const newParticipant: MeetupParticipant = {
      userId: a.userId,
      personalGoals: personalGoals,
      joinedAt: new Date()
    }

    meetup.participants.push(newParticipant)

    // Update meetup in storage
    await put(meetupKey, JSON.stringify(meetup), {
      access: 'public',
      contentType: 'application/json'
    })

    return new Response(JSON.stringify({
      success: true,
      message: 'Successfully joined meetup',
      meetup: {
        id: meetup.id,
        title: meetup.title,
        scheduledFor: meetup.scheduledFor,
        status: meetup.status,
        participants: meetup.participants.length
      }
    }), { headers: { 'Content-Type': 'application/json' } })

  } catch (error) {
    console.error('Error joining meetup:', error)
    return new Response(JSON.stringify({ error: 'Failed to join meetup' }), { status: 500 })
  }
}
