'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Target, Trophy, Plus, ArrowLeft, Edit3, Check } from 'lucide-react';
import { RewardGame } from '@/lib/types';

export default function RewardsPage() {
  const router = useRouter();
  const [games, setGames] = useState<RewardGame[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Load games from localStorage (demo - would be API in production)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('luvler_reward_games');
      if (saved) {
        setGames(JSON.parse(saved).map((game: any) => ({
          ...game,
          createdAt: new Date(game.createdAt),
          completedAt: game.completedAt ? new Date(game.completedAt) : undefined
        })));
      }
    } catch (error) {
      console.warn('Error loading reward games:', error);
    }
  }, []);

  const saveGames = (updatedGames: RewardGame[]) => {
    try {
      localStorage.setItem('luvler_reward_games', JSON.stringify(updatedGames));
      setGames(updatedGames);
    } catch (error) {
      console.warn('Error saving reward games:', error);
    }
  };

  const parseTargetFromGoal = (text: string): number => {
    const m = text.match(/\b(\d{1,3})\b/)
    if (m) return Math.max(1, parseInt(m[1]))
    if (/sessions?|times?|reps?/i.test(text)) return 10
    if (/weeks?|days?/i.test(text)) return 7
    return 1
  }

  const createGame = (goal: string, reward: string, userLogic?: string, targetOverride?: number) => {
    const newGame: RewardGame = {
      id: Date.now().toString(),
      userId: 'demo-user', // Would be real user ID
      goal,
      reward,
      userLogic,
      progress: 0,
      target: targetOverride && targetOverride > 0 ? targetOverride : parseTargetFromGoal(goal),
      isActive: true,
      modifications: [],
      createdAt: new Date()
    };

    saveGames([...games, newGame]);
    setShowCreateForm(false);
  };

  const updateProgress = (gameId: string, increment: number = 1) => {
    const updatedGames = games.map(game => {
      if (game.id === gameId) {
        const newProgress = game.progress + increment;
        const completedAt = newProgress >= game.target ? new Date() : undefined;
        return {
          ...game,
          progress: newProgress,
          completedAt,
          celebrated: completedAt ? false : game.celebrated
        };
      }
      return game;
    });
    saveGames(updatedGames);
  };

  const modifyGame = (gameId: string, changes: Partial<RewardGame>) => {
    const updatedGames = games.map(game => {
      if (game.id === gameId) {
        return {
          ...game,
          ...changes,
          modifications: [
            ...game.modifications,
            {
              date: new Date(),
              changes: `Updated: ${Object.keys(changes).join(', ')}`,
              reason: 'User modification'
            }
          ]
        };
      }
      return game;
    });
    saveGames(updatedGames);
  };

  const celebrateCompletion = (gameId: string) => {
    const updatedGames = games.map(game =>
      game.id === gameId ? { ...game, celebrated: true } : game
    );
    saveGames(updatedGames);
  };

  const activeGames = games.filter(game => game.isActive && !game.completedAt);
  const completedGames = games.filter(game => game.completedAt);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.push('/companion')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Companion
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reward Games</h1>
        <p className="text-gray-700">You define the reward logic. Celebrate attempts as progress—even when outcomes vary.</p>
      </div>

      {/* Active Games */}
      {activeGames.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Active Games</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {activeGames.map(game => (
              <RewardGameCard
                key={game.id}
                game={game}
                onProgress={() => updateProgress(game.id)}
                onModify={(changes) => modifyGame(game.id, changes)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Create New Game */}
      <div className="mb-8">
        {!showCreateForm ? (
          <button
            onClick={() => setShowCreateForm(true)}
            className="luvler-button-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Reward Game
          </button>
        ) : (
          <CreateGameForm
            onCreate={createGame}
            onCancel={() => setShowCreateForm(false)}
          />
        )}
      </div>

      {/* Completed Games */}
      {completedGames.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Completed Games</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {completedGames.map(game => (
              <div key={game.id} className="luvler-card bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Trophy className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{game.goal}</h3>
                    <p className="text-sm text-gray-600 mb-2">Reward: {game.reward}</p>
                    <p className="text-xs text-green-700">
                      Completed {game.completedAt?.toLocaleDateString()}
                    </p>
                    {!game.celebrated && (
                      <button
                        onClick={() => celebrateCompletion(game.id)}
                        className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium"
                      >
                        Celebrate! 🎉
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-gray-100">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <Target className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">How Reward Games Work</h3>
            <div className="text-gray-700 space-y-2">
              <p>• <strong>You set the goal</strong>: What you want to accomplish</p>
              <p>• <strong>You choose the reward</strong>: Something that motivates you</p>
              <p>• <strong>You track progress</strong>: Mark when you complete steps</p>
              <p>• <strong>You can change it anytime</strong>: Modify goals, rewards, or rules</p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Your motivation system is valid. If something works for you, that's what matters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RewardGameCard({ game, onProgress, onModify }: {
  game: RewardGame;
  onProgress: () => void;
  onModify: (changes: Partial<RewardGame>) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editGoal, setEditGoal] = useState(game.goal);
  const [editReward, setEditReward] = useState(game.reward);

  const progressPercent = Math.min((game.progress / game.target) * 100, 100);

  const handleSaveEdit = () => {
    onModify({ goal: editGoal, reward: editReward });
    setIsEditing(false);
  };

  return (
    <div className="luvler-card">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
            <input
              value={editGoal}
              onChange={e => setEditGoal(e.target.value)}
              className="luvler-input w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reward</label>
            <input
              value={editReward}
              onChange={e => setEditReward(e.target.value)}
              className="luvler-input w-full"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSaveEdit} className="luvler-button-primary flex-1">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="luvler-button-secondary">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{game.goal}</h3>
              <p className="text-sm text-gray-600">Reward: {game.reward}</p>
              {game.userLogic && (
                <p className="text-xs text-gray-500 mt-1 italic">
                  "{game.userLogic}"
                </p>
              )}
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{game.progress} / {game.target}</span>
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={onProgress}
            className="w-full luvler-button-primary flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Mark Progress
          </button>
        </>
      )}
    </div>
  );
}

function CreateGameForm({ onCreate, onCancel }: {
  onCreate: (goal: string, reward: string, userLogic?: string, targetOverride?: number) => void;
  onCancel: () => void;
}) {
  const [goal, setGoal] = useState('');
  const [reward, setReward] = useState('');
  const [userLogic, setUserLogic] = useState('');
  const [target, setTarget] = useState<number | undefined>(undefined);
  const [touchedReward, setTouchedReward] = useState(false);
  const [touchedLogic, setTouchedLogic] = useState(false);

  // Heuristic suggestion engine (Malachi-inspired autonomy design)
  const suggestFromGoal = (text: string) => {
    const lower = text.toLowerCase()
    let suggestedReward = 'Do something you enjoy for 15–30 minutes'
    if (/homework|study|worksheet|school/.test(lower)) suggestedReward = 'Play a game or watch one episode'
    if (/pokemon|baseball|cards?/.test(lower)) suggestedReward = 'Open a 10‑card pack or sort your cards'
    if (/exercise|walk|run|gym/.test(lower)) suggestedReward = 'Listen to a favorite song or take a relaxing break'
    if (/practice|piano|instrument|music/.test(lower)) suggestedReward = 'Watch a short video or free time on your phone'
    const m = lower.match(/\b(\d{1,3})\b/)
    const suggestedTarget = m ? Math.max(1, parseInt(m[1])) : (/sessions?|times?|reps?/.test(lower) ? 10 : 1)
    const logic = "This reward makes it easier to start and keeps effort feeling worthwhile."
    return { suggestedReward, suggestedTarget, logic }
  }

  // Debounce suggestions while typing
  useEffect(() => {
    if (!goal.trim()) return
    const t = setTimeout(() => {
      const { suggestedReward, suggestedTarget, logic } = suggestFromGoal(goal)
      if (!touchedReward && !reward.trim()) setReward(suggestedReward)
      if (!touchedLogic && !userLogic.trim()) setUserLogic(logic)
      setTarget(suggestedTarget)
    }, 300)
    return () => clearTimeout(t)
  }, [goal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goal.trim() && reward.trim()) {
      onCreate(goal.trim(), reward.trim(), userLogic.trim() || undefined, target);
      setGoal('');
      setReward('');
      setUserLogic('');
      setTarget(undefined)
    }
  };

  return (
    <div className="luvler-card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Your Reward Game</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What do you want to accomplish?</label>
          <input
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="e.g., Complete 5 math worksheets"
            className="luvler-input w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What's your reward?</label>
          <input
            value={reward}
            onChange={e => { setTouchedReward(true); setReward(e.target.value) }}
            placeholder="e.g., Play video games for 30 minutes"
            className="luvler-input w-full"
            required
          />
          {target && (
            <p className="text-xs text-gray-500 mt-1">Suggested target: {target}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your logic (optional)
            <span className="text-xs text-gray-500 block">Why does this reward motivate you?</span>
          </label>
          <textarea
            value={userLogic}
            onChange={e => { setTouchedLogic(true); setUserLogic(e.target.value) }}
            placeholder="This works for me because..."
            className="luvler-textarea w-full"
            rows={3}
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="luvler-button-primary flex-1">
            Create Game
          </button>
          <button type="button" onClick={onCancel} className="luvler-button-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
