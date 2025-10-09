'use client';

import { useState } from 'react';
import { Shield, Users, Calendar, Check, X, AlertTriangle } from 'lucide-react';
import { ClinicalDataSharing } from '@/lib/types';

interface ConsentFlowProps {
  clinicianName: string;
  clinicianId: string;
  userId: string;
  onGrantAccess: (
    clinicianId: string,
    accessLevel: 'summary' | 'full',
    sharedDataTypes: ('goals' | 'progress' | 'reflections')[],
    expiresAt?: Date
  ) => Promise<void>;
  onRevokeAccess: (clinicianId: string) => Promise<void>;
  onClose: () => void;
  existingSharing?: ClinicalDataSharing;
}

export function ConsentFlow({
  clinicianName,
  clinicianId,
  userId,
  onGrantAccess,
  onRevokeAccess,
  onClose,
  existingSharing
}: ConsentFlowProps) {
  const [step, setStep] = useState<'overview' | 'permissions' | 'duration' | 'confirm'>(existingSharing ? 'overview' : 'overview');
  const [accessLevel, setAccessLevel] = useState<'summary' | 'full'>(existingSharing?.accessLevel || 'summary');
  const [sharedDataTypes, setSharedDataTypes] = useState<('goals' | 'progress' | 'reflections')[]>(
    existingSharing?.sharedDataTypes || ['goals', 'progress']
  );
  const [expirationType, setExpirationType] = useState<'3months' | '6months' | '1year' | 'indefinite'>('6months');
  const [isLoading, setIsLoading] = useState(false);
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);

  const handleDataTypeToggle = (dataType: 'goals' | 'progress' | 'reflections') => {
    setSharedDataTypes(prev =>
      prev.includes(dataType)
        ? prev.filter(t => t !== dataType)
        : [...prev, dataType]
    );
  };

  const handleGrantAccess = async () => {
    setIsLoading(true);
    try {
      let expiresAt: Date | undefined;
      if (expirationType !== 'indefinite') {
        expiresAt = new Date();
        switch (expirationType) {
          case '3months':
            expiresAt.setMonth(expiresAt.getMonth() + 3);
            break;
          case '6months':
            expiresAt.setMonth(expiresAt.getMonth() + 6);
            break;
          case '1year':
            expiresAt.setFullYear(expiresAt.getFullYear() + 1);
            break;
        }
      }

      await onGrantAccess(clinicianId, accessLevel, sharedDataTypes, expiresAt);
      onClose();
    } catch (error) {
      console.error('Error granting access:', error);
      alert('Failed to grant access. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeAccess = async () => {
    setIsLoading(true);
    try {
      await onRevokeAccess(clinicianId);
      onClose();
    } catch (error) {
      console.error('Error revoking access:', error);
      alert('Failed to revoke access. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showRevokeConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Revoke Access</h2>
            </div>

            <p className="text-gray-700 mb-6">
              Are you sure you want to revoke {clinicianName}'s access to your clinical data? They will no longer be able to see your goals, progress, or reflections.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRevokeConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRevokeAccess}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Revoking...' : 'Revoke Access'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {existingSharing ? 'Manage Access' : 'Grant Access'}
                </h1>
                <p className="text-sm text-gray-600">Share with {clinicianName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Status */}
          {existingSharing && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Currently sharing {existingSharing.accessLevel} access
                  </p>
                  <p className="text-xs text-green-700">
                    Granted on {existingSharing.grantedAt.toLocaleDateString()}
                    {existingSharing.expiresAt && ` • Expires ${existingSharing.expiresAt.toLocaleDateString()}`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Overview Step */}
          {step === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">What happens when you share?</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Clinical Support</p>
                      <p className="text-sm text-gray-600">Your clinician can provide better support by seeing your goals and progress.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Your Control</p>
                      <p className="text-sm text-gray-600">You can revoke access at any time. Your data remains secure.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Time-Limited</p>
                      <p className="text-sm text-gray-600">Access expires automatically unless you choose indefinite sharing.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {existingSharing ? (
                  <>
                    <button
                      onClick={() => setStep('permissions')}
                      className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors"
                    >
                      Modify Access
                    </button>
                    <button
                      onClick={() => setShowRevokeConfirm(true)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                    >
                      Revoke Access
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setStep('permissions')}
                    className="w-full bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Set Permissions
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Permissions Step */}
          {step === 'permissions' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">What can they see?</h2>

                {/* Access Level */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Access Level
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl hover:border-primary-300 cursor-pointer">
                      <input
                        type="radio"
                        name="accessLevel"
                        value="summary"
                        checked={accessLevel === 'summary'}
                        onChange={(e) => setAccessLevel(e.target.value as 'summary')}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Summary Only</div>
                        <div className="text-sm text-gray-600">Progress updates and goal completion status</div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl hover:border-primary-300 cursor-pointer">
                      <input
                        type="radio"
                        name="accessLevel"
                        value="full"
                        checked={accessLevel === 'full'}
                        onChange={(e) => setAccessLevel(e.target.value as 'full')}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Full Access</div>
                        <div className="text-sm text-gray-600">Goals, detailed progress, and personal reflections</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Data Types */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Specific Data Types
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'goals' as const, label: 'Goals & Tasks', desc: 'What you\'re working toward' },
                      { value: 'progress' as const, label: 'Progress Tracking', desc: 'How you\'re doing on tasks' },
                      { value: 'reflections' as const, label: 'Personal Reflections', desc: 'Your thoughts and insights' }
                    ].map(({ value, label, desc }) => (
                      <label key={value} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={sharedDataTypes.includes(value)}
                          onChange={() => handleDataTypeToggle(value)}
                          className="rounded"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{label}</div>
                          <div className="text-sm text-gray-600">{desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('overview')}
                    className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('duration')}
                    className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    Set Duration
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Duration Step */}
          {step === 'duration' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">How long should they have access?</h2>
                <div className="space-y-3">
                  {[
                    { value: '3months' as const, label: '3 Months', desc: 'Good for short-term support' },
                    { value: '6months' as const, label: '6 Months', desc: 'Standard clinical relationship' },
                    { value: '1year' as const, label: '1 Year', desc: 'Long-term therapeutic work' },
                    { value: 'indefinite' as const, label: 'Indefinite', desc: 'Ongoing clinical relationship' }
                  ].map(({ value, label, desc }) => (
                    <label key={value} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-primary-300 cursor-pointer">
                      <input
                        type="radio"
                        name="expiration"
                        value={value}
                        checked={expirationType === value}
                        onChange={(e) => setExpirationType(value)}
                        className="text-primary-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{label}</div>
                        <div className="text-sm text-gray-600">{desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('permissions')}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('confirm')}
                  className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 transition-colors"
                >
                  Review & Confirm
                </button>
              </div>
            </div>
          )}

          {/* Confirm Step */}
          {step === 'confirm' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Review Your Choices</h2>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm font-medium text-gray-900 mb-2">Sharing with:</div>
                    <div className="text-gray-700">{clinicianName}</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm font-medium text-gray-900 mb-2">Access Level:</div>
                    <div className="text-gray-700 capitalize">{accessLevel} Access</div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm font-medium text-gray-900 mb-2">Data Types:</div>
                    <div className="text-gray-700">
                      {sharedDataTypes.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm font-medium text-gray-900 mb-2">Duration:</div>
                    <div className="text-gray-700">
                      {expirationType === 'indefinite' ? 'Indefinite access' :
                       expirationType === '3months' ? '3 months' :
                       expirationType === '6months' ? '6 months' :
                       '1 year'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">You can revoke access anytime</p>
                    <p>Your data remains secure and you can change permissions or stop sharing at any time.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('duration')}
                  className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleGrantAccess}
                  disabled={isLoading}
                  className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? 'Granting Access...' : 'Grant Access'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
