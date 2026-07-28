import { useRef, useState, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';

type SliderPair = {
  id: string;
  caption: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

const SLIDERS: SliderPair[] = [
  {
    id: 'slider-1',
    caption: 'Rear Seat Deep Clean',
    before: '/images/SaveClip.App_743484443_18070027403456554_1200273123970074059_n.jpg',
    after: '/images/SaveClip.App_746761809_18070027412456554_1149550884746043969_n.jpg',
    beforeAlt: 'Rear seat before deep clean',
    afterAlt: 'Rear seat after deep clean',
  },
  {
    id: 'slider-2',
    caption: 'Truck Spill Restoration',
    before: '/images/SaveClip.App_752561442_18071693729456554_8419550440068557229_n.jpg',
    after: '/images/SaveClip.App_749330734_18071693705456554_5803046546571921482_n.jpg',
    beforeAlt: 'Truck interior before spill restoration',
    afterAlt: 'Truck interior after spill restoration',
  },
];

function BeforeAfterSlider({ pair }: { pair: SliderPair }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  }, [updateFromClientX]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  }, [updateFromClientX]);

  const endDrag = useCallback(() => {
    draggingRef.current = false;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    updateFromClientX(e.touches[0].clientX);
  }, [updateFromClientX]);

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-dark-500 shadow-card select-none cursor-ew-resize touch-none group"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTouchMove={onTouchMove}
      >
        {/* After (full, base layer) */}
        <img
          src={pair.after}
          alt={pair.afterAlt}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Before (clipped via clip-path so it never squishes) */}
        <img
          src={pair.before}
          alt={pair.beforeAlt}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        />

        {/* Subtle inner gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent pointer-events-none" />

        {/* Labels */}
        <span className="absolute top-4 left-4 bg-dark/85 backdrop-blur-sm text-gold text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded pointer-events-none border border-gold/20">
          Before
        </span>
        <span className="absolute top-4 right-4 bg-dark/85 backdrop-blur-sm text-blue-light text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded pointer-events-none border border-blue-brand/30">
          After
        </span>

        {/* Slider handle line + grip */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gold pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold-gradient text-dark flex items-center justify-center shadow-gold ring-4 ring-dark/50">
            <MoveHorizontal className="w-6 h-6" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-white text-base font-semibold tracking-wide">{pair.caption}</p>
      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1.5">
        <MoveHorizontal className="w-3.5 h-3.5" />
        Drag the handle to compare
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
            Before & <span className="text-gold">After</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Drag the slider handle to reveal the transformation. Real results
            from our detailing service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
          {SLIDERS.map((pair) => (
            <BeforeAfterSlider key={pair.id} pair={pair} />
          ))}
        </div>
      </div>
    </section>
  );
}
