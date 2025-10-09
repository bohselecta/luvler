'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Star, TrendingUp, MessageCircle, Calendar, Award, Target } from 'lucide-react';

interface ReflectionEntry {
  id: string;
  date: Date;
  activity: string;
  rating: number; // 1-5
  whatWentWell: string;
  whatCouldImprove: string;
  nextTimeGoals: string;
  mood: 'great' | 'good' | 'okay' | 'challenging' | 'difficult';
}

export default function ReflectionPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<ReflectionEntry[]>([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<ReflectionEntry>>({
    date: new Date(),
    rating: 3,
    mood: 'okay'
  });

  // Load reflection entries from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('luvler_friendship_reflections');
      if (saved) {
        const parsed = JSON.parse(saved).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setEntries(parsed);
      }
    } catch (error) {
      console.warn('Error loading reflection entries:', error);
    }
  }, []);

  const saveEntries = (updatedEntries: ReflectionEntry[]) => {
    try {
      localStorage.setItem('luvler_friendship_reflections', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
    } catch (error) {
      console.warn('Error saving reflection entries:', error);
    }
  };

  const addReflectionEntry = () => {
    if (!currentEntry.activity || !currentEntry.whatWentWell) return;

    const newEntry: ReflectionEntry = {
      id: `reflection_${Date.now()}`,
      date: currentEntry.date || new Date(),
      activity: currentEntry.activity,
      rating: currentEntry.rating || 3,
      whatWentWell: currentEntry.whatWentWell,
      whatCouldImprove: currentEntry.whatCouldImprove || '',
      nextTimeGoals: currentEntry.nextTimeGoals || '',
      mood: currentEntry.mood || 'okay'
    };

    const updatedEntries = [newEntry, ...entries];
    saveEntries(updatedEntries);

    // Reset form
    setCurrentEntry({
      date: new Date(),
      rating: 3,
      mood: 'okay'
    });
    setShowNewEntry(false);
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'okay': return 'text-yellow-600 bg-yellow-100';
      case 'challenging': return 'text-orange-600 bg-orange-100';
      case 'difficult': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const recentEntries = entries.slice(0, 5);
  const averageRating = entries.length > 0
    ? Math.round(entries.reduce((sum, entry) => sum + entry.rating, 0) / entries.length * 10) / 10
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/companion/friends')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Friendship Builder
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reflect & Grow</h1>
        <p className="text-gray-700">Celebrate progress and learn from every social experience.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="luvler-card text-center">
          <div className="flex items-center justify-center mb-3">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{entries.length}</div>
          <div className="text-sm text-gray-600">Reflections Recorded</div>
        </div>

        <div className="luvler-card text-center">
          <div className="flex items-center justify-center mb-3">
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{averageRating}/5</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>

        <div className="luvler-card text-center">
          <div className="flex items-center justify-center mb-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {entries.filter(e => e.rating >= 4).length}
          </div>
          <div className="text-sm text-gray-600">Positive Experiences</div>
        </div>
      </div>

      {/* Add New Entry Button */}
      <div className="mb-8">
        {!showNewEntry ? (
          <button
            onClick={() => setShowNewEntry(true)}
            className="luvler-button-primary flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Add Reflection
          </button>
        ) : (
          <div className="luvler-card">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">New Reflection</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What social activity did you do?
                </label>
                <input
                  type="text"
                  value={currentEntry.activity || ''}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, activity: e.target.value })}
                  placeholder="e.g., Said hello to a classmate, joined a meetup, practiced conversation..."
                  className="luvler-input w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did it go? (1-5 stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setCurrentEntry({ ...currentEntry, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          (currentEntry.rating || 0) >= star
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How were you feeling?
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { value: 'great', label: 'Great' },
                    { value: 'good', label: 'Good' },
                    { value: 'okay', label: 'Okay' },
                    { value: 'challenging', label: 'Challenging' },
                    { value: 'difficult', label: 'Difficult' }
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setCurrentEntry({ ...currentEntry, mood: value as any })}
                      className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                        currentEntry.mood === value
                          ? getMoodColor(value)
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What went well?
                </label>
                <textarea
                  value={currentEntry.whatWentWell || ''}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, whatWentWell: e.target.value })}
                  placeholder="What positive things happened? What did you do well?"
                  className="luvler-textarea w-full"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What could be improved next time? (optional)
                </label>
                <textarea
                  value={currentEntry.whatCouldImprove || ''}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, whatCouldImprove: e.target.value })}
                  placeholder="What would you do differently? What felt challenging?"
                  className="luvler-textarea w-full"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goals for next time (optional)
                </label>
                <textarea
                  value={currentEntry.nextTimeGoals || ''}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, nextTimeGoals: e.target.value })}
                  placeholder="What do you want to try differently or focus on next time?"
                  className="luvler-textarea w-full"
                  rows={2}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addReflectionEntry}
                  disabled={!currentEntry.activity || !currentEntry.whatWentWell}
                  className="luvler-button-primary flex-1"
                >
                  Save Reflection
                </button>
                <button
                  onClick={() => setShowNewEntry(false)}
                  className="luvler-button-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent Reflections */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Recent Reflections</h2>

        {recentEntries.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No reflections yet</h3>
            <p className="text-gray-600 mb-6">
              Start reflecting on your social experiences to track your progress and growth.
            </p>
            <button
              onClick={() => setShowNewEntry(true)}
              className="luvler-button-primary"
            >
              Add Your First Reflection
            </button>
          </div>
        ) : (
          recentEntries.map((entry) => (
            <div key={entry.id} className="luvler-card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{entry.activity}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {entry.date.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      {getRatingStars(entry.rating)}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </span>
                  </div>
                </div>
                <Award className="w-5 h-5 text-yellow-500" />
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-green-700 mb-1">What went well:</h4>
                  <p className="text-gray-700 text-sm">{entry.whatWentWell}</p>
                </div>

                {entry.whatCouldImprove && (
                  <div>
                    <h4 className="text-sm font-medium text-blue-700 mb-1">Areas for growth:</h4>
                    <p className="text-gray-700 text-sm">{entry.whatCouldImprove}</p>
                  </div>
                )}

                {entry.nextTimeGoals && (
                  <div>
                    <h4 className="text-sm font-medium text-purple-700 mb-1">Next time goals:</h4>
                    <p className="text-gray-700 text-sm">{entry.nextTimeGoals}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Encouragement */}
      <div className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-gray-100">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Reflection Builds Confidence</h3>
          <p className="text-gray-700 mb-4 max-w-2xl mx-auto">
            Taking time to reflect on your social experiences helps you learn from each interaction,
            celebrate your progress, and build confidence for future connections.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/70 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-1">Notice Patterns</div>
              <div className="text-gray-600">See what works well and what you want to try differently.</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-1">Celebrate Growth</div>
              <div className="text-gray-600">Acknowledge how far you've come in your social journey.</div>
            </div>
            <div className="bg-white/70 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-1">Plan for Success</div>
              <div className="text-gray-600">Use insights to set achievable goals for future interactions.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
