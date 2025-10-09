import { PrivacySettings, ClinicalDataSharing } from './types'
import { put, del, list } from '@vercel/blob'
import { logConsentChange } from './audit'

// Privacy and data management utilities
export async function getPrivacySettings(userId: string): Promise<PrivacySettings> {
  try {
    const settingsKey = `users/${userId}/privacy.json`
    const { blobs } = await list({ prefix: settingsKey })

    if (blobs.length > 0) {
      const response = await fetch(blobs[0].url)
      const settings: PrivacySettings = await response.json()
      return {
        ...settings,
        lastUpdated: settings.lastUpdated ? new Date(settings.lastUpdated) : new Date()
      }
    }
  } catch (error) {
    console.error('Error fetching privacy settings:', error)
  }

  // Return default settings
  return {
    shareWithClinician: false,
    shareWithParent: false,
    shareForResearch: false,
    lastUpdated: new Date()
  }
}

export async function updatePrivacySettings(
  userId: string,
  settings: Partial<PrivacySettings>
): Promise<PrivacySettings> {
  try {
    const currentSettings = await getPrivacySettings(userId)
    const updatedSettings: PrivacySettings = {
      ...currentSettings,
      ...settings,
      lastUpdated: new Date()
    }

    const settingsKey = `users/${userId}/privacy.json`
    await put(settingsKey, JSON.stringify(updatedSettings), {
      access: 'public',
      contentType: 'application/json'
    })

    return updatedSettings
  } catch (error) {
    console.error('Error updating privacy settings:', error)
    throw new Error('Failed to update privacy settings')
  }
}

export async function grantClinicalDataAccess(
  userId: string,
  clinicianId: string,
  accessLevel: 'summary' | 'full',
  sharedDataTypes: ('goals' | 'progress' | 'reflections')[],
  expiresAt?: Date
): Promise<ClinicalDataSharing> {
  try {
    const sharing: ClinicalDataSharing = {
      sharedDataTypes,
      accessLevel,
      expiresAt,
      grantedAt: new Date(),
      clinicianId,
      canRevoke: true
    }

    // Store sharing agreement
    const sharingKey = `users/${userId}/clinical-sharing/${clinicianId}.json`
    await put(sharingKey, JSON.stringify(sharing), {
      access: 'public',
      contentType: 'application/json'
    })

    // Update privacy settings
    await updatePrivacySettings(userId, {
      shareWithClinician: true,
      clinicianId,
      clinicianAccessLevel: accessLevel
    })

    // Log the consent change
    await logConsentChange(userId, clinicianId, accessLevel, {
      sharedDataTypes,
      expiresAt: expiresAt?.toISOString(),
      grantedAt: sharing.grantedAt.toISOString()
    })

    return sharing
  } catch (error) {
    console.error('Error granting clinical data access:', error)
    throw new Error('Failed to grant clinical data access')
  }
}

export async function revokeClinicalDataAccess(
  userId: string,
  clinicianId: string
): Promise<void> {
  try {
    // Remove sharing agreement
    const sharingKey = `users/${userId}/clinical-sharing/${clinicianId}.json`
    try {
      await del(sharingKey)
    } catch (error) {
      console.warn('Error deleting sharing agreement:', error)
    }

    // Update privacy settings
    await updatePrivacySettings(userId, {
      shareWithClinician: false,
      clinicianId: undefined,
      clinicianAccessLevel: undefined
    })

    // Log the revocation
    await logConsentChange(userId, clinicianId, 'revoked', {
      revokedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error revoking clinical data access:', error)
    throw new Error('Failed to revoke clinical data access')
  }
}

export async function getClinicalDataSharings(userId: string): Promise<ClinicalDataSharing[]> {
  try {
    const sharings: ClinicalDataSharing[] = []
    const prefix = `users/${userId}/clinical-sharing/`

    const { blobs } = await list({ prefix })
    for (const blob of blobs) {
      try {
        const response = await fetch(blob.url)
        const sharing: ClinicalDataSharing = await response.json()
        sharings.push(sharing)
      } catch (error) {
        console.error('Error parsing sharing agreement:', error)
      }
    }

    return sharings
  } catch (error) {
    console.error('Error fetching clinical data sharings:', error)
    return []
  }
}

export async function exportUserData(userId: string): Promise<{
  personal: any
  clinical: any
  privacy: PrivacySettings
  sharings: ClinicalDataSharing[]
}> {
  try {
    const [personalData, clinicalData, privacySettings, sharings] = await Promise.all([
      getUserData(userId, 'personal'),
      getUserData(userId, 'clinical'),
      getPrivacySettings(userId),
      getClinicalDataSharings(userId)
    ])

    return {
      personal: personalData,
      clinical: clinicalData,
      privacy: privacySettings,
      sharings
    }
  } catch (error) {
    console.error('Error exporting user data:', error)
    throw new Error('Failed to export user data')
  }
}

export async function deleteUserData(userId: string): Promise<void> {
  try {
    // Delete all user data blobs
    const prefixes = [
      `users/${userId}/`,
      `audit/${userId}/`,
      `rewards/${userId}/`,
      `meetups/` // Note: This would need more specific filtering in production
    ]

    for (const prefix of prefixes) {
      try {
        const { blobs } = await list({ prefix })
        for (const blob of blobs) {
          await del(blob.url)
        }
      } catch (error) {
        console.error(`Error deleting ${prefix}:`, error)
      }
    }
  } catch (error) {
    console.error('Error deleting user data:', error)
    throw new Error('Failed to delete user data')
  }
}

// Helper to get user data by type
async function getUserData(userId: string, type: 'personal' | 'clinical'): Promise<any> {
  try {
    const dataKey = `users/${userId}/${type}.json`
    const { blobs } = await list({ prefix: dataKey })

    if (blobs.length > 0) {
      const response = await fetch(blobs[0].url)
      return await response.json()
    }
  } catch (error) {
    console.error(`Error fetching ${type} data:`, error)
  }
  return {}
}
