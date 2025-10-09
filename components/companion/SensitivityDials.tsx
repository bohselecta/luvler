'use client';

import { MeetupSettings } from '@/lib/types'

type Props = {
  value: MeetupSettings
  onChange?: (next: MeetupSettings) => void
  readOnly?: boolean
}

export default function SensitivityDials({ value, onChange, readOnly }: Props) {
  const handleToggle = (key: keyof MeetupSettings) => {
    if (readOnly || !onChange) return
    onChange({ ...value, [key]: !value[key] as any })
  }

  const handleNumber = (key: keyof MeetupSettings, parse: (v: string) => number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (readOnly || !onChange) return
    onChange({ ...value, [key]: parse(e.target.value) as any })
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-3 border rounded-xl">
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-800">Audio only</span>
          <input type="checkbox" checked={value.audioOnly} onChange={() => handleToggle('audioOnly')} disabled={readOnly} aria-label="Audio only" />
        </label>
        <p className="text-xs text-gray-600 mt-1">Reduce sensory load; voice without camera.</p>
      </div>

      <div className="p-3 border rounded-xl">
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-800">Text chat enabled</span>
          <input type="checkbox" checked={value.textChatEnabled} onChange={() => handleToggle('textChatEnabled')} disabled={readOnly} aria-label="Text chat enabled" />
        </label>
        <p className="text-xs text-gray-600 mt-1">Allow written responses and links.</p>
      </div>

      <div className="p-3 border rounded-xl">
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-800">Structured turns</span>
          <input type="checkbox" checked={value.structuredTurns} onChange={() => handleToggle('structuredTurns')} disabled={readOnly} aria-label="Structured turns" />
        </label>
        <p className="text-xs text-gray-600 mt-1">Queue and time guidance for speaking.</p>
      </div>

      <div className="p-3 border rounded-xl">
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-800">Breakout rooms</span>
          <input type="checkbox" checked={value.breakoutRooms} onChange={() => handleToggle('breakoutRooms')} disabled={readOnly} aria-label="Breakout rooms" />
        </label>
        <p className="text-xs text-gray-600 mt-1">Small, quieter spaces for side chats.</p>
      </div>

      <div className="p-3 border rounded-xl">
        <label className="block text-sm font-medium text-gray-800 mb-2" htmlFor="maxParticipants">Max participants</label>
        <select id="maxParticipants" value={value.maxParticipants} onChange={handleNumber('maxParticipants', (v) => parseInt(v))} disabled={readOnly} className="luvler-input">
          {[3,4,5,6,7,8,9,10].map(n => (<option key={n} value={n}>{n}</option>))}
        </select>
      </div>

      <div className="p-3 border rounded-xl">
        <label className="block text-sm font-medium text-gray-800 mb-2" htmlFor="duration">Duration</label>
        <select id="duration" value={value.duration} onChange={handleNumber('duration', (v) => parseInt(v))} disabled={readOnly} className="luvler-input">
          {[15,30,45,60,90].map(n => (<option key={n} value={n}>{n} minutes</option>))}
        </select>
      </div>

      <div className="p-3 border rounded-xl md:col-span-2">
        <label className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-800">Recording allowed</span>
          <input type="checkbox" checked={value.recordingEnabled} onChange={() => handleToggle('recordingEnabled')} disabled={readOnly} aria-label="Recording allowed" />
        </label>
        <p className="text-xs text-gray-600 mt-1">Respect privacy. Enable only with clear consent.</p>
      </div>
    </div>
  )
}


