/** candles subindo com a linha de tendência: o vertical de cripto */
const CANDLES = [
  { x: 40, wick: [128, 160], body: [134, 20], filled: true },
  { x: 66, wick: [118, 152], body: [124, 22], filled: false },
  { x: 92, wick: [112, 146], body: [118, 20], filled: true },
  { x: 118, wick: [98, 136], body: [104, 24], filled: false },
  { x: 144, wick: [104, 132], body: [110, 16], filled: true },
  { x: 170, wick: [84, 122], body: [90, 26], filled: false },
  { x: 196, wick: [72, 106], body: [78, 22], filled: false },
  { x: 222, wick: [78, 104], body: [84, 14], filled: true },
  { x: 248, wick: [56, 94], body: [62, 26], filled: false },
] as const;

export function CandlesDrawing() {
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {CANDLES.map((c, i) => (
        <g key={c.x}>
          <line className="ink" x1={c.x} y1={c.wick[0]} x2={c.x} y2={c.wick[1]} />
          <rect
            className="grow"
            x={c.x - 6}
            y={c.body[0]}
            width={12}
            height={c.body[1]}
            fill={c.filled ? 'var(--ink)' : 'var(--concrete)'}
            stroke="var(--ink)"
            strokeWidth={1.5}
            style={{ animationDelay: `${i * 0.06}s` }}
          />
        </g>
      ))}
      <line x1={274} y1={36} x2={274} y2={76} stroke="var(--signal)" strokeWidth={1.5} />
      <rect className="grow" x={268} y={42} width={12} height={28} fill="var(--signal)" style={{ animationDelay: '0.54s' }} />
      <polyline className="trace" fill="none" stroke="var(--signal)" strokeWidth={2.5} points="40,146 66,138 92,130 118,118 144,116 170,104 196,90 222,88 248,74 274,56" />
    </svg>
  );
}
