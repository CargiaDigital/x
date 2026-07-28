import { useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

const SLIDERS = [
  {
    id: 'slider-1',
    caption: 'Rear Seat Deep Clean',
    before: '/images/SaveClip.App_743484443_18070027403456554_1200273123970074059_n.jpg',
    after: '/images/SaveClip.App_743484443_18070027403456554_1200273123970074059_n.jpg',
  },
  {
    id: 'slider-2',
    caption: 'Truck Spill Restoration',
    before: '/images/SaveClip.App_752561442_18071693729456554_8419550440068557229_n.jpg',
    after: '/images/SaveClip.App_752561442_18071693729456554_8419550440068557229_n copy.jpg',
  },
];

function Slider({ caption, before, after }: { caption: string; before: string; after: string }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-dark-500 shadow-card select-none">
        {/* After — full base */}
        <img src={after} alt="After" draggable={false} className="absolute inset-0 w-full h-full object-cover" />
        {/* Before — clipped to left portion */}
        <img
          src={before}
          alt="Before"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gold pointer-events-none"
          style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold-gradient text-dark flex items-center justify-center shadow-gold ring-4 ring-dark/50 pointer-events-none">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 bg-dark/80 backdrop-blur-sm text-gold text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded border border-gold/20 pointer-events-none">
          Before
        </span>
        <span className="absolute top-3 right-3 bg-dark/80 backdrop-blur-sm text-blue-light text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded border border-blue-brand/30 pointer-events-none">
          After
        </span>

        {/* Range input — full overlay, invisible but interactive */}
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize m-0 p-0"
          style={{ WebkitAppearance: 'none', appearance: 'none' }}
          aria-label="Drag to compare before and after"
        />
      </div>

      <p className="mt-4 text-white text-sm font-semibold tracking-wide">{caption}</p>
      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1.5">
        <MoveHorizontal className="w-3 h-3" />
        Drag to compare
      </p>
    </div>
  );
}

export default function BeforeAfterSliders() {
  return (
    <section id="before-after" className="py-24 bg-dark-100 border-t border-dark-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">See The Difference</span>
          <h2 className="section-heading">
            Before &amp; <span className="text-gold">After</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Drag the handle to reveal the transformation. Real results from our detailing service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
          {SLIDERS.map((s) => (
            <Slider key={s.id} caption={s.caption} before={s.before} after={s.after} />
          ))}
        </div>
      </div>
    </section>
  );
}
