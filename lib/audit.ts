import { DataAccessLog, AuditEvent } from './types'
import { put, list } from '@vercel/blob'

// Audit logging utility for HIPAA compliance
export async function logDataAccess(
  userId: string,
  accessorId: string,
  dataType: 'personal' | 'clinical' | 'anonymized',
  accessType: 'read' | 'write' | 'share' | 'revoke',
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return
  }

  const event: DataAccessLog = {
    id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    userId,
    accessorId,
    dataType,
    accessType,
    ipAddress,
    userAgent
  }

  try {
    const monthKey = new Date().toISOString().slice(0, 7) // YYYY-MM
    const auditKey = `audit/${userId}/${monthKey}.json`

    // Get existing audit log for this month
    let existingLogs: DataAccessLog[] = []
    try {
      const { blobs } = await list({ prefix: auditKey })
      if (blobs.length > 0) {
        const response = await fetch(blobs[0].url)
        existingLogs = await response.json()
      }
    } catch (error) {
      // File doesn't exist yet, start with empty array
    }

    // Add new event
    existingLogs.push(event)

    // Keep only last 90 days of data (rough limit)
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    const filteredLogs = existingLogs.filter(log => log.timestamp > ninetyDaysAgo)

    // Save updated log
    await put(auditKey, JSON.stringify(filteredLogs), {
      access: 'public',
      contentType: 'application/json'
    })
  } catch (error) {
    console.warn('Failed to log data access, audit may not persist:', error)
    // Don't throw - audit logging failures shouldn't break functionality
  }
}

export async function logConsentChange(
  userId: string,
  clinicianId: string,
  accessLevel: string,
  changes: Record<string, any>
): Promise<void> {
  const event: AuditEvent = {
    id: `consent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    userId,
    action: 'consent_change',
    resource: 'clinical_data_sharing',
    accessorId: clinicianId,
    details: {
      accessLevel,
      ...changes
    }
  }

  await logAuditEvent(userId, event)
}

export async function getAuditLog(
  userId: string,
  days: number = 90
): Promise<DataAccessLog[]> {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    const allLogs: DataAccessLog[] = []

    // Get logs for recent months
    for (let i = 0; i < Math.ceil(days / 30); i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthKey = date.toISOString().slice(0, 7)
      const auditKey = `audit/${userId}/${monthKey}.json`

      try {
        const { blobs } = await list({ prefix: auditKey })
        if (blobs.length > 0) {
          const response = await fetch(blobs[0].url)
          const monthLogs: DataAccessLog[] = await response.json()
          allLogs.push(...monthLogs)
        }
      } catch (error) {
        // Month doesn't exist, continue
      }
    }

    // Filter by date and sort by timestamp (newest first)
    return allLogs
      .filter(log => log.timestamp > cutoffDate)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  } catch (error) {
    console.warn('Failed to retrieve audit log, returning empty list:', error)
    return []
  }
}

async function logAuditEvent(userId: string, event: AuditEvent): Promise<void> {
  const logEntry: DataAccessLog = {
    id: event.id,
    timestamp: event.timestamp,
    userId: event.userId,
    accessorId: event.accessorId || 'system',
    dataType: 'clinical', // Default for consent changes
    accessType: 'share', // Consent changes are sharing events
    userAgent: event.details?.userAgent,
    ipAddress: event.details?.ipAddress
  }

  await logDataAccess(
    userId,
    event.accessorId || 'system',
    'clinical',
    'share'
  )
}
