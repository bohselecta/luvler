import { NextRequest, NextResponse } from 'next/server'
import { put, list, head, del } from '@vercel/blob'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type RewardGame = {
  id: string
  userId: string
  goal: string
  reward: string
  userLogic?: string
  progress: number
  target: number
  isActive: boolean
  celebrated?: boolean
  modifications: { date: string; changes: string; reason?: string }[]
  createdAt: string
  completedAt?: string
}

function getPrefix(userId: string) {
  return `rewards/${userId}/games/`
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId') || 'demo-user'
    const prefix = getPrefix(userId)
    const files = await list({ prefix })
    const games: RewardGame[] = []
    for (const file of files.blobs) {
      try {
        const res = await fetch(file.url)
        if (res.ok) {
          const data = await res.json()
          games.push(data)
        }
      } catch (e) {
        console.error('Rewards GET fetch blob error:', e)
      }
    }
    return NextResponse.json({ success: true, games })
  } catch (error: any) {
    console.error('Rewards GET error:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Failed to list' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const userId: string = body.userId || 'demo-user'
    const game: RewardGame = body.game
    if (!game || !userId) return NextResponse.json({ success: false, error: 'Missing game or userId' }, { status: 400 })
    const id = game.id || Date.now().toString()
    const key = `${getPrefix(userId)}${id}.json`
    const payload = { ...game, id, userId }
    await put(key, JSON.stringify(payload), { access: 'public', contentType: 'application/json' })
    return NextResponse.json({ success: true, game: payload })
  } catch (error: any) {
    console.error('Rewards POST error:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Failed to create' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const userId: string = body.userId || 'demo-user'
    const gameId: string = body.gameId
    const changes: Partial<RewardGame> = body.changes || {}
    if (!gameId) return NextResponse.json({ success: false, error: 'Missing gameId' }, { status: 400 })
    const key = `${getPrefix(userId)}${gameId}.json`
    const h = await head(key)
    if (!h || !h.url) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    const current = await fetch(h.url).then(r => r.json()) as RewardGame
    const updated: RewardGame = { ...current, ...changes }
    await put(key, JSON.stringify(updated), { access: 'public', contentType: 'application/json' })
    return NextResponse.json({ success: true, game: updated })
  } catch (error: any) {
    console.error('Rewards PATCH error:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId') || 'demo-user'
    const gameId = searchParams.get('gameId')
    if (!gameId) return NextResponse.json({ success: false, error: 'Missing gameId' }, { status: 400 })
    const key = `${getPrefix(userId)}${gameId}.json`
    await del(key)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Rewards DELETE error:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Failed to delete' }, { status: 500 })
  }
}


