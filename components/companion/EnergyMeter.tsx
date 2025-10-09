'use client';

import { useState } from 'react'

export function EnergyMeter() {
  const [level, setLevel] = useState(3) // 1..4
  const labels = ['Low', 'Okay', 'Good', 'Full']
  return (
    <div className="luvler-card">
      <h3 className="font-semibold text-gray-900">Energy & Sensory</h3>
      <p className="text-gray-700 mt-1">Quick check-in. Adjust your plan gently.</p>
      <div className="flex items-center gap-2 mt-3">
        {[1,2,3,4].map(n => (
          <button key={n} onClick={() => setLevel(n)} className={`w-10 h-6 rounded ${n <= level ? 'bg-success-500' : 'bg-gray-300'}`} aria-label={`Energy ${n}`} />
        ))}
      </div>
      <p className="text-gray-700 mt-2">Current: {labels[level-1]}</p>
    </div>
  )
}


