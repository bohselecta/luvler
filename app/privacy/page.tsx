'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Eye, EyeOff, Download, Trash2, ArrowLeft, Lock, Users, User, Database } from 'lucide-react';
import { PrivacySettings } from '@/lib/types';

export default function PrivacyPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<PrivacySettings>({
    shareWithClinician: false,
    shareWithParent: false,
    shareForResearch: false,
    lastUpdated: new Date()
  });

  // Load settings from localStorage (demo - would be API)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('luvler_privacy_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings({
          ...parsed,
          lastUpdated: parsed.lastUpdated ? new Date(parsed.lastUpdated) : new Date()
        });
      }
    } catch (error) {
      console.warn('Error loading privacy settings:', error);
    }
  }, []);

  const saveSettings = (updatedSettings: PrivacySettings) => {
    const newSettings = { ...updatedSettings, lastUpdated: new Date() };
    try {
      localStorage.setItem('luvler_privacy_settings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.warn('Error saving privacy settings:', error);
    }
  };

  const updateSetting = (key: keyof PrivacySettings, value: any) => {
    saveSettings({ ...settings, [key]: value });
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
        <p className="text-gray-700">You control who sees your information and how it's used.</p>
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
                      onChange={e => updateSetting('shareWithClinician', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Enable clinician sharing</span>
                  </label>

                  {settings.shareWithClinician && (
                    <div className="ml-6 space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Clinician ID
                        </label>
                        <input
                          value={settings.clinicianId || ''}
                          onChange={e => updateSetting('clinicianId', e.target.value)}
                          placeholder="Enter clinician identifier"
                          className="luvler-input"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Access Level
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="clinicianAccess"
                              value="summary"
                              checked={settings.clinicianAccessLevel === 'summary'}
                              onChange={e => updateSetting('clinicianAccessLevel', 'summary')}
                            />
                            <span className="text-sm">Summary only (progress without details)</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="clinicianAccess"
                              value="full"
                              checked={settings.clinicianAccessLevel === 'full'}
                              onChange={e => updateSetting('clinicianAccessLevel', 'full')}
                            />
                            <span className="text-sm">Full access (goals, steps, reflections)</span>
                          </label>
                        </div>
                      </div>
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
                    onChange={e => updateSetting('shareWithParent', e.target.checked)}
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
                    onChange={e => updateSetting('shareForResearch', e.target.checked)}
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
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <Download className="w-5 h-5 text-primary-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Download My Data</div>
              <div className="text-sm text-gray-600">Get a copy of all your information</div>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border border-red-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-colors">
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
    </div>
  );
}
