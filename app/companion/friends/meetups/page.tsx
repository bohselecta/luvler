'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Users, Calendar, Clock, Search, Filter } from 'lucide-react';
import { VirtualMeetup, MeetupTemplate } from '@/lib/types';

export default function MeetupsPage() {
  const router = useRouter();
  const [meetups, setMeetups] = useState<VirtualMeetup[]>([]);
  const [templates, setTemplates] = useState<MeetupTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'scheduled' | 'active'>('all');

  useEffect(() => {
    fetchMeetups();
    fetchTemplates();
  }, []);

  const fetchMeetups = async () => {
    try {
      // In a real implementation, this would fetch from an API
      // For now, we'll show some demo meetups
      const demoMeetups: VirtualMeetup[] = [
        {
          id: 'demo-meetup-1',
          title: 'Pokemon Card Strategy Discussion',
          topic: 'Share tips and strategies for Pokemon TCG',
          specialInterest: 'pokemon',
          hostId: 'demo-host',
          participants: [
            { userId: 'demo-host', personalGoals: ['Share 3 strategies', 'Learn new deck ideas'], joinedAt: new Date() },
            { userId: 'user-1', personalGoals: ['Ask about fire decks'], joinedAt: new Date() }
          ],
          templateId: 'game-strategy',
          settings: {
            audioOnly: false,
            textChatEnabled: true,
            structuredTurns: true,
            maxParticipants: 8,
            duration: 45,
            recordingEnabled: false,
            breakoutRooms: false
          },
          scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
          duration: 45,
          status: 'scheduled',
          createdAt: new Date()
        },
        {
          id: 'demo-meetup-2',
          title: 'Drawing Techniques Share',
          topic: 'Share and learn drawing techniques',
          specialInterest: 'drawing',
          hostId: 'demo-host-2',
          participants: [
            { userId: 'demo-host-2', personalGoals: ['Show watercolor technique'], joinedAt: new Date() }
          ],
          templateId: 'drawing-circle',
          settings: {
            audioOnly: false,
            textChatEnabled: true,
            structuredTurns: false,
            maxParticipants: 6,
            duration: 60,
            recordingEnabled: true,
            breakoutRooms: true
          },
          scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
          duration: 60,
          status: 'scheduled',
          createdAt: new Date()
        }
      ];
      setMeetups(demoMeetups);
    } catch (error) {
      console.error('Error fetching meetups:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/meetups/templates');
      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const filteredMeetups = meetups.filter(meetup => {
    const matchesSearch = meetup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meetup.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meetup.specialInterest.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || meetup.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const handleJoinMeetup = (meetupId: string) => {
    router.push(`/companion/friends/meetups/${meetupId}`);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/companion/friends')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Friendship Builder
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Meetups</h1>
        <p className="text-gray-700">Connect with others who share your special interests in structured, supportive environments.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search meetups by interest or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'scheduled' | 'active')}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Meetups</option>
            <option value="scheduled">Scheduled</option>
            <option value="active">Active Now</option>
          </select>

          <button
            onClick={() => setShowCreateForm(true)}
            className="luvler-button-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Meetup
          </button>
        </div>
      </div>

      {/* Meetups Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredMeetups.map((meetup) => (
          <div key={meetup.id} className="luvler-card group hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors">
                  {meetup.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{meetup.topic}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                meetup.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                meetup.status === 'active' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {meetup.status}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                {new Date(meetup.scheduledFor).toLocaleDateString()} at {new Date(meetup.scheduledFor).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {meetup.duration} minutes
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                {meetup.participants.length}/{meetup.settings.maxParticipants} joined
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                  {meetup.specialInterest}
                </span>
                {meetup.settings.audioOnly && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    Audio only
                  </span>
                )}
                {meetup.settings.structuredTurns && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Structured
                  </span>
                )}
              </div>

              <button
                onClick={() => handleJoinMeetup(meetup.id)}
                className="luvler-button-secondary text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMeetups.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No meetups found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Be the first to create a meetup for your special interest!'
            }
          </p>
          {!showCreateForm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="luvler-button-primary"
            >
              Create the First Meetup
            </button>
          )}
        </div>
      )}

      {/* Create Meetup Modal */}
      {showCreateForm && (
        <CreateMeetupModal
          templates={templates}
          onClose={() => setShowCreateForm(false)}
          onCreated={() => {
            setShowCreateForm(false);
            fetchMeetups(); // Refresh the list
          }}
        />
      )}

      {/* Info Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Virtual Meetups?</h3>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Structured social connections around special interests create natural opportunities for friendship-building in supportive environments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Shared Interests</h4>
            <p className="text-sm text-gray-600">Connect with people who naturally understand your passions</p>
          </div>

          <div className="text-center">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Filter className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Structured Format</h4>
            <p className="text-sm text-gray-600">Clinical templates provide clear expectations and flow</p>
          </div>

          <div className="text-center">
            <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-1">Personal Goals</h4>
            <p className="text-sm text-gray-600">Set achievable social goals for each meetup</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateMeetupModal({ templates, onClose, onCreated }: {
  templates: MeetupTemplate[];
  onClose: () => void;
  onCreated: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    specialInterest: '',
    templateId: '',
    scheduledFor: '',
    duration: 60
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/meetups/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        onCreated();
      } else {
        alert(data.error || 'Failed to create meetup');
      }
    } catch (error) {
      console.error('Error creating meetup:', error);
      alert('Failed to create meetup');
    } finally {
      setLoading(false);
    }
  };

  const selectedTemplate = templates.find(t => t.id === formData.templateId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create a Virtual Meetup</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meetup Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Pokemon Card Strategy Discussion"
                className="luvler-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic Description *
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                placeholder="Brief description of what you'll discuss"
                className="luvler-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Interest *
              </label>
              <input
                type="text"
                value={formData.specialInterest}
                onChange={(e) => setFormData({ ...formData, specialInterest: e.target.value })}
                placeholder="e.g., pokemon, drawing, music"
                className="luvler-input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meetup Template *
              </label>
              <select
                value={formData.templateId}
                onChange={(e) => setFormData({ ...formData, templateId: e.target.value })}
                className="luvler-input w-full"
                required
              >
                <option value="">Choose a template...</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name} - {template.description}
                  </option>
                ))}
              </select>
              {selectedTemplate && (
                <p className="text-sm text-gray-600 mt-1">{selectedTemplate.description}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledFor}
                  onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
                  className="luvler-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  className="luvler-input w-full"
                >
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="luvler-button-primary flex-1"
              >
                {loading ? 'Creating...' : 'Create Meetup'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="luvler-button-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
