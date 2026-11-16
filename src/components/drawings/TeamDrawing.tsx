/** um líder ligado ao time: liderança técnica */
const MEMBERS = [
  [80, 52],
  [240, 52],
  [70, 140],
  [250, 140],
  [160, 170],
] as const;

export function TeamDrawing() {
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {MEMBERS.map(([x, y], i) => (
        <line key={`l${i}`} className="ink trace-short" x1={160} y1={100} x2={x} y2={y} style={{ animationDelay: `${i * 0.08}s` }} />
      ))}
      <line className="ink trace-short" x1={80} y1={52} x2={70} y2={140} strokeDasharray="3 5" style={{ animationDelay: '0.5s' }} />
      <line className="ink trace-short" x1={240} y1={52} x2={250} y2={140} strokeDasharray="3 5" style={{ animationDelay: '0.55s' }} />
      {MEMBERS.map(([x, y], i) => (
        <rect key={`n${i}`} className="pop" x={x - 8} y={y - 8} width={16} height={16} fill="var(--concrete-hi)" stroke="var(--ink)" strokeWidth={1.5} style={{ animationDelay: `${0.3 + i * 0.06}s` }} />
      ))}
      <rect className="pop" x={146} y={86} width={28} height={28} fill="var(--signal)" />
    </svg>
  );
}
