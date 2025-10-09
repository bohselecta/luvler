'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { ArrowLeft, Users, Calendar, Clock, Settings, Heart, MessageCircle, Mic, MicOff } from 'lucide-react';
import { VirtualMeetup, MeetupSettings } from '@/lib/types';

export default function MeetupRoomPage() {
  const router = useRouter();
  const params = useParams();
  const meetupId = params.meetupId as string;

  const [meetup, setMeetup] = useState<VirtualMeetup | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [personalGoals, setPersonalGoals] = useState<string[]>(['']);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    fetchMeetup();
  }, [meetupId]);

  const fetchMeetup = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/meetups/${meetupId}`);
      if (!response.ok) {
        throw new Error('Meetup not found');
      }
      const data = await response.json();
      setMeetup(data.meetup);

      // Check if current user is a participant
      // For demo purposes, we'll assume they're not joined initially
      setIsJoined(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load meetup');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinMeetup = async () => {
    try {
      const response = await fetch('/api/meetups/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetupId,
          personalGoals: personalGoals.filter(g => g.trim())
        })
      });

      const data = await response.json();
      if (data.success) {
        setIsJoined(true);
        // Refresh meetup data
        await fetchMeetup();
      } else {
        alert(data.error || 'Failed to join meetup');
      }
    } catch (error) {
      console.error('Error joining meetup:', error);
      alert('Failed to join meetup');
    }
  };

  const addGoal = () => {
    setPersonalGoals([...personalGoals, '']);
  };

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...personalGoals];
    newGoals[index] = value;
    setPersonalGoals(newGoals);
  };

  const removeGoal = (index: number) => {
    if (personalGoals.length > 1) {
      setPersonalGoals(personalGoals.filter((_, i) => i !== index));
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading meetup...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !meetup) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Meetup Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/companion/friends/meetups')}
            className="luvler-button-primary"
          >
            Back to Meetups
          </button>
        </div>
      </div>
    );
  }

  const isHost = false; // In a real app, check if current user is the host
  const canJoin = meetup.status === 'scheduled' && meetup.participants.length < meetup.settings.maxParticipants;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/companion/friends/meetups')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Meetups
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{meetup.title}</h1>
            <p className="text-gray-700 mb-4">{meetup.topic}</p>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(meetup.scheduledFor).toLocaleDateString()} at {new Date(meetup.scheduledFor).toLocaleTimeString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {meetup.duration} minutes
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {meetup.participants.length}/{meetup.settings.maxParticipants} joined
              </div>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            meetup.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
            meetup.status === 'active' ? 'bg-green-100 text-green-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {meetup.status}
          </div>
        </div>
      </div>

      {/* Meetup Settings */}
      <div className="luvler-card mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Meetup Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            {meetup.settings.audioOnly ? (
              <MicOff className="w-5 h-5 text-gray-400" />
            ) : (
              <Mic className="w-5 h-5 text-green-600" />
            )}
            <span className="text-sm">
              {meetup.settings.audioOnly ? 'Audio only' : 'Video enabled'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MessageCircle className={`w-5 h-5 ${meetup.settings.textChatEnabled ? 'text-green-600' : 'text-gray-400'}`} />
            <span className="text-sm">
              {meetup.settings.textChatEnabled ? 'Text chat enabled' : 'Text chat disabled'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Users className={`w-5 h-5 ${meetup.settings.structuredTurns ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className="text-sm">
              {meetup.settings.structuredTurns ? 'Structured turns' : 'Open discussion'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Heart className={`w-5 h-5 ${meetup.settings.breakoutRooms ? 'text-purple-600' : 'text-gray-400'}`} />
            <span className="text-sm">
              {meetup.settings.breakoutRooms ? 'Breakout rooms available' : 'No breakout rooms'}
            </span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Special Interest:</strong> {meetup.specialInterest}
          </p>
          <p className="text-sm text-blue-800 mt-1">
            This meetup is designed around shared interests to help build natural connections.
          </p>
        </div>
      </div>

      {/* Join Section */}
      {!isJoined && canJoin && (
        <div className="luvler-card mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Join This Meetup</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Set personal goals for this meetup (optional but recommended)
            </label>
            <p className="text-sm text-gray-600 mb-3">
              Having specific goals can make social situations feel more manageable and successful.
            </p>

            {personalGoals.map((goal, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => updateGoal(index, e.target.value)}
                  placeholder={`Goal ${index + 1}: e.g., "Say hello to 2 people"`}
                  className="luvler-input flex-1"
                />
                {personalGoals.length > 1 && (
                  <button
                    onClick={() => removeGoal(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addGoal}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add another goal
            </button>
          </div>

          <button
            onClick={handleJoinMeetup}
            className="luvler-button-primary w-full"
          >
            Join Meetup
          </button>
        </div>
      )}

      {isJoined && (
        <div className="luvler-card mb-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900">You're all set!</h3>
              <p className="text-sm text-green-700">You've successfully joined this meetup.</p>
            </div>
          </div>

          {personalGoals.filter(g => g.trim()).length > 0 && (
            <div>
              <p className="text-sm font-medium text-green-900 mb-2">Your personal goals:</p>
              <ul className="text-sm text-green-800 space-y-1">
                {personalGoals.filter(g => g.trim()).map((goal, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Participants */}
      <div className="luvler-card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Participants ({meetup.participants.length})
        </h2>

        <div className="space-y-3">
          {meetup.participants.map((participant, index) => (
            <div key={participant.userId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-700">
                    {participant.userId === meetup.hostId ? '👑' : '👤'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Participant {index + 1}
                    {participant.userId === meetup.hostId && (
                      <span className="ml-2 text-xs text-amber-600 font-medium">(Host)</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-600">
                    Joined {new Date(participant.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {participant.personalGoals.length > 0 && (
                <div className="text-right">
                  <p className="text-xs text-gray-600">
                    {participant.personalGoals.length} goal{participant.personalGoals.length !== 1 ? 's' : ''} set
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {meetup.participants.length < meetup.settings.maxParticipants && (
          <p className="text-sm text-gray-600 mt-4">
            {meetup.settings.maxParticipants - meetup.participants.length} spot{meetup.settings.maxParticipants - meetup.participants.length !== 1 ? 's' : ''} still available
          </p>
        )}
      </div>
    </div>
  );
}
