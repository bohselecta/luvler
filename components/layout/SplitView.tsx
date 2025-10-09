'use client';

type Preset = 'single' | 'dual' | 'tri'

export function SplitView({
  preset = 'single',
  left,
  center,
  right,
}: {
  preset?: Preset
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
}) {
  if (preset === 'single') {
    return <div>{center || left || right}</div>
  }
  if (preset === 'dual') {
    return (
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-7">
          {center || left}
        </div>
        <div className="col-span-12 lg:col-span-5">
          {right || left}
        </div>
      </div>
    )
  }
  // tri
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-3">
        {left}
      </div>
      <div className="col-span-12 lg:col-span-6">
        {center}
      </div>
      <div className="col-span-12 lg:col-span-3">
        {right}
      </div>
    </div>
  )
}


