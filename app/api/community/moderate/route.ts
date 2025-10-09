import { auth } from '@clerk/nextjs/server'
import { put, list } from '@vercel/blob'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface ModerationAction {
  id: string
  moderatorId: string
  entityType: 'post' | 'comment' | 'meetup'
  entityId: string
  action: 'hide' | 'warn' | 'ban' | 'approve'
  reason: string
  timestamp: Date
  details?: Record<string, any>
}

export async function POST(request: Request) {
  try {
    const a = await auth()
    if (!a.userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    const { entityType, entityId, action, reason, details } = await request.json() as {
      entityType: 'post' | 'comment' | 'meetup'
      entityId: string
      action: 'hide' | 'warn' | 'ban' | 'approve'
      reason: string
      details?: Record<string, any>
    }

    // Create moderation event
    const moderationEvent: ModerationAction = {
      id: `mod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      moderatorId: a.userId,
      entityType,
      entityId,
      action,
      reason,
      timestamp: new Date(),
      details
    }

    // Store moderation event
    const moderationKey = `moderation/${entityType}/${entityId}/${moderationEvent.id}.json`
    await put(moderationKey, JSON.stringify(moderationEvent), {
      access: 'public',
      contentType: 'application/json'
    })

    // If action is hide/ban, update the entity status
    if (action === 'hide' || action === 'ban') {
      await updateEntityStatus(entityType, entityId, action)
    }

    return new Response(JSON.stringify({
      success: true,
      moderationId: moderationEvent.id
    }), { headers: { 'Content-Type': 'application/json' } })

  } catch (error) {
    console.error('Error processing moderation action:', error)
    return new Response(JSON.stringify({ error: 'Failed to process moderation action' }), { status: 500 })
  }
}

async function updateEntityStatus(entityType: string, entityId: string, action: 'hide' | 'ban') {
  try {
    // This would update the entity's moderation status
    // For demo purposes, we'll just log it
    const statusUpdate = {
      entityId,
      action,
      moderatedAt: new Date(),
      status: action === 'ban' ? 'banned' : 'hidden'
    }

    const statusKey = `moderation/status/${entityType}/${entityId}.json`
    await put(statusKey, JSON.stringify(statusUpdate), {
      access: 'public',
      contentType: 'application/json'
    })
  } catch (error) {
    console.error('Error updating entity status:', error)
  }
}

// GET endpoint to retrieve moderation history for an entity
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const entityType = searchParams.get('entityType')
  const entityId = searchParams.get('entityId')

  if (!entityType || !entityId) {
    return new Response(JSON.stringify({ error: 'Missing entityType or entityId' }), { status: 400 })
  }

  try {
    const moderationKey = `moderation/${entityType}/${entityId}/`
    const { blobs } = await list({ prefix: moderationKey })

    const moderationHistory: ModerationAction[] = []
    for (const blob of blobs) {
      try {
        const response = await fetch(blob.url)
        const event: ModerationAction = await response.json()
        moderationHistory.push(event)
      } catch (error) {
        console.error('Error parsing moderation event:', error)
      }
    }

    // Sort by timestamp (newest first)
    moderationHistory.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    return new Response(JSON.stringify({
      success: true,
      moderationHistory
    }), { headers: { 'Content-Type': 'application/json' } })

  } catch (error) {
    console.error('Error retrieving moderation history:', error)
    return new Response(JSON.stringify({ error: 'Failed to retrieve moderation history' }), { status: 500 })
  }
}
