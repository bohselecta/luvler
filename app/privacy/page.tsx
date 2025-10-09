'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, Download, Trash2, ArrowLeft, Lock, Users, User, Database, Settings, FileText } from 'lucide-react';
import { PrivacySettings, ClinicalDataSharing } from '@/lib/types';
import { getPrivacySettings, updatePrivacySettings, getClinicalDataSharings, exportUserData, deleteUserData } from '@/lib/privacy';
import { getAuditLog } from '@/lib/audit';
import { ConsentFlow } from '@/components/shared/ConsentFlow';

export default function PrivacyPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<PrivacySettings>({
    shareWithClinician: false,
    shareWithParent: false,
    shareForResearch: false,
    lastUpdated: new Date()
  });
  const [sharings, setSharings] = useState<ClinicalDataSharing[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [showConsentFlow, setShowConsentFlow] = useState(false);
  const [selectedClinician, setSelectedClinician] = useState<{id: string, name: string} | null>(null);
  const [loading, setLoading] = useState(true);

  // Load privacy data
  useEffect(() => {
    loadPrivacyData();
  }, []);

  const loadPrivacyData = async () => {
    try {
      setLoading(true);
      const [privacySettings, clinicalSharings, auditData] = await Promise.all([
        getPrivacySettings('demo-user'), // In real app, get from auth
        getClinicalDataSharings('demo-user'),
        getAuditLog('demo-user', 30)
      ]);

      setSettings(privacySettings);
      setSharings(clinicalSharings);
      setAuditLogs(auditData);
    } catch (error) {
      console.warn('Error loading privacy data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSetting = async (key: keyof PrivacySettings, value: any) => {
    try {
      const updated = await updatePrivacySettings('demo-user', { [key]: value });
      setSettings(updated);
    } catch (error) {
      console.warn('Error updating privacy setting:', error);
      alert('Failed to update setting. Please try again.');
    }
  };

  const handleGrantAccess = async (
    clinicianId: string,
    accessLevel: 'summary' | 'full',
    sharedDataTypes: ('goals' | 'progress' | 'reflections')[],
    expiresAt?: Date
  ) => {
    try {
      await import('@/lib/privacy').then(({ grantClinicalDataAccess }) =>
        grantClinicalDataAccess('demo-user', clinicianId, accessLevel, sharedDataTypes, expiresAt)
      );
      await loadPrivacyData(); // Refresh data
    } catch (error) {
      console.error('Error granting access:', error);
      throw error;
    }
  };

  const handleRevokeAccess = async (clinicianId: string) => {
    try {
      await import('@/lib/privacy').then(({ revokeClinicalDataAccess }) =>
        revokeClinicalDataAccess('demo-user', clinicianId)
      );
      await loadPrivacyData(); // Refresh data
    } catch (error) {
      console.error('Error revoking access:', error);
      throw error;
    }
  };

  const handleExportData = async () => {
    try {
      const data = await exportUserData('demo-user');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `luvler-data-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  const handleDeleteData = async () => {
    if (!confirm('Are you sure you want to permanently delete all your data? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteUserData('demo-user');
      alert('Your data has been deleted. You will be redirected.');
      router.push('/');
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Failed to delete data. Please contact support.');
    }
  };

  const dataSections = [
    {
      title: 'Your Personal Information',
      description: 'Name, contact details, and basic profile information',
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      data: ['Name', 'Email (if provided)', 'Role (neurodivergent/family/clinician)', 'Comfort preferences'],
      type: 'personal'
    },
    {
      title: 'Your Goals & Progress',
      description: 'Goals you set, steps you complete, and your journey',
      icon: Database,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      data: ['Goal descriptions', 'Completed steps', 'Progress tracking', 'Personal reflections'],
      type: 'clinical'
    },
    {
      title: 'Anonymized Research Data',
      description: 'Aggregated data to help improve the tool for everyone',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      data: ['Usage patterns', 'Feature effectiveness', 'General success rates'],
      type: 'research'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy & Data Sharing</h1>
        <p className="text-gray-700">You choose who sees your data. Change your mind anytime.</p>
      </div>

      {/* Current Sharing Status */}
      <div className="luvler-card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          Current Privacy Settings
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`w-12 h-12 ${settings.shareWithClinician ? 'bg-green-100' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-2`}>
              {settings.shareWithClinician ? <Eye className="w-6 h-6 text-green-600" /> : <EyeOff className="w-6 h-6 text-gray-400" />}
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Clinician Access</h3>
            <p className="text-sm text-gray-600">
              {settings.shareWithClinician
                ? `Sharing with ${settings.clinicianId || 'clinician'} (${settings.clinicianAccessLevel})`
                : 'Not shared'
              }
            </p>
          </div>

          <div className="text-center">
            <div className={`w-12 h-12 ${settings.shareWithParent ? 'bg-green-100' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-2`}>
              {settings.shareWithParent ? <Eye className="w-6 h-6 text-green-600" /> : <EyeOff className="w-6 h-6 text-gray-400" />}
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Parent Access</h3>
            <p className="text-sm text-gray-600">
              {settings.shareWithParent ? 'Summary only' : 'Not shared'}
            </p>
          </div>

          <div className="text-center">
            <div className={`w-12 h-12 ${settings.shareForResearch ? 'bg-green-100' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-2`}>
              {settings.shareForResearch ? <Eye className="w-6 h-6 text-green-600" /> : <EyeOff className="w-6 h-6 text-gray-400" />}
            </div>
            <h3 className="font-medium text-gray-900 mb-1">Research Data</h3>
            <p className="text-sm text-gray-600">
              {settings.shareForResearch ? 'Anonymized data shared' : 'Not shared'}
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          Last updated: {settings.lastUpdated?.toLocaleDateString()}
        </p>
      </div>

      {/* Data Types */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What Data Do We Collect?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {dataSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="luvler-card">
                <div className={`w-10 h-10 ${section.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${section.color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                <div className="space-y-1">
                  {section.data.map((item, i) => (
                    <div key={i} className="text-xs text-gray-500 flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Access Log */}
      {auditLogs && auditLogs.length > 0 && (
        <div className="luvler-card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            Recent Access (last 5)
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {auditLogs.slice(0,5).map((log, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                {new Date(log.timestamp).toLocaleString()} — {log.accessType} {log.dataType} by {log.accessorId}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            You control access. You can revoke clinician sharing at any time.
          </p>
        </div>
      )}

      {/* Sharing Controls */}
      <div className="luvler-card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Control Who Can See Your Data</h2>

        <div className="space-y-6">
          {/* Clinician Sharing */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Share with Clinician</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Allow your clinician to see your goals and progress to provide better support.
                </p>

                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={settings.shareWithClinician || false}
                      onChange={e => handleUpdateSetting('shareWithClinician', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Enable clinician sharing</span>
                  </label>

                  {settings.shareWithClinician && (
                    <div className="ml-6 space-y-3">
                      {sharings.length > 0 ? (
                        <div className="space-y-2">
                          {sharings.map(sharing => (
                            <div key={sharing.clinicianId} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-green-900">
                                    Clinician {sharing.clinicianId}
                                  </p>
                                  <p className="text-xs text-green-700">
                                    {sharing.accessLevel} access • Granted {sharing.grantedAt.toLocaleDateString()}
                                    {sharing.expiresAt && ` • Expires ${sharing.expiresAt.toLocaleDateString()}`}
                                  </p>
                                </div>
                                <button
                                  onClick={() => {
                                    setSelectedClinician({ id: sharing.clinicianId, name: `Clinician ${sharing.clinicianId}` });
                                    setShowConsentFlow(true);
                                  }}
                                  className="text-xs text-green-700 hover:text-green-900 underline"
                                >
                                  Manage
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedClinician({ id: 'demo-clinician', name: 'Demo Clinician' });
                            setShowConsentFlow(true);
                          }}
                          className="w-full bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors"
                        >
                          Set Up Clinician Access
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Parent Sharing */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Share with Parent/Guardian</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Allow parents to see summary progress to support their child.
                </p>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.shareWithParent || false}
                    onChange={e => handleUpdateSetting('shareWithParent', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Enable parent summary access</span>
                </label>
              </div>
            </div>
          </div>

          {/* Research Sharing */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Database className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Contribute to Research</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Help improve the tool for others by sharing anonymized usage data.
                  Your personal information is never included.
                </p>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.shareForResearch || false}
                    onChange={e => handleUpdateSetting('shareForResearch', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Share anonymized research data</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="luvler-card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Manage Your Data</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={handleExportData}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <Download className="w-5 h-5 text-primary-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Download My Data</div>
              <div className="text-sm text-gray-600">Get a copy of all your information</div>
            </div>
          </button>

          <button
            onClick={handleDeleteData}
            className="flex items-center gap-3 p-4 border border-red-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Delete My Data</div>
              <div className="text-sm text-gray-600">Permanently remove all your information</div>
            </div>
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Data is Secure</h3>
            <div className="text-gray-700 space-y-2">
              <p>• All data is encrypted at rest and in transit</p>
              <p>• You can revoke access at any time</p>
              <p>• Clinicians only see what you explicitly allow</p>
              <p>• Research data is completely anonymized</p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              If you have questions about your privacy, please contact support.
            </p>
          </div>
        </div>
      </div>

      {/* Consent Flow Modal */}
      {showConsentFlow && selectedClinician && (
        <ConsentFlow
          clinicianName={selectedClinician.name}
          clinicianId={selectedClinician.id}
          userId="demo-user"
          onGrantAccess={handleGrantAccess}
          onRevokeAccess={handleRevokeAccess}
          onClose={() => {
            setShowConsentFlow(false);
            setSelectedClinician(null);
          }}
          existingSharing={sharings.find(s => s.clinicianId === selectedClinician.id)}
        />
      )}
    </div>
  );
}
