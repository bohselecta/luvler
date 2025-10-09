import { auth } from '@clerk/nextjs/server'
import { head, put } from '@vercel/blob'
import { MeetupTemplate, VirtualMeetup, MeetupSettings } from '@/lib/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const a = await auth()
    if (!a.userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const {
      title,
      topic,
      specialInterest,
      templateId,
      settings = {},
      scheduledFor,
      duration = 60
    } = await request.json() as {
      title: string
      topic: string
      specialInterest: string
      templateId: string
      settings?: Partial<MeetupSettings>
      scheduledFor: string
      duration?: number
    }

    // Generate unique meetup ID
    const meetupId = `meetup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Default meetup settings
    const defaultSettings: MeetupSettings = {
      audioOnly: false,
      textChatEnabled: true,
      structuredTurns: false,
      maxParticipants: 10,
      duration: duration,
      recordingEnabled: false,
      breakoutRooms: false,
      ...settings
    }

    const meetup: VirtualMeetup = {
      id: meetupId,
      title,
      topic,
      specialInterest,
      hostId: a.userId,
      participants: [{
        userId: a.userId,
        personalGoals: [],
        joinedAt: new Date()
      }],
      templateId,
      settings: defaultSettings,
      scheduledFor: new Date(scheduledFor),
      duration: duration,
      status: 'scheduled',
      createdAt: new Date()
    }

    // Store meetup in Vercel Blob
    const meetupKey = `meetups/${meetupId}.json`
    await put(meetupKey, JSON.stringify(meetup), {
      access: 'public',
      contentType: 'application/json'
    })

    return new Response(JSON.stringify({
      success: true,
      meetup: {
        id: meetup.id,
        title: meetup.title,
        scheduledFor: meetup.scheduledFor,
        status: meetup.status
      }
    }), { headers: { 'Content-Type': 'application/json' } })

  } catch (error) {
    console.error('Error creating meetup:', error)
    return new Response(JSON.stringify({ error: 'Failed to create meetup' }), { status: 500 })
  }
}
