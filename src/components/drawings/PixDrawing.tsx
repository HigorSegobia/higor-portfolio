/** duas contas e uma transferência indo e voltando sem parar: o PIX */
export function PixDrawing({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {[36, 220].map((x, i) => (
        <g key={x}>
          <rect className="pop" x={x} y={62} width={64} height={76} fill="var(--concrete-hi)" stroke="var(--ink)" strokeWidth={1.5} style={{ animationDelay: `${i * 0.12}s` }} />
          <line className="ink" x1={x + 12} y1={80} x2={x + 52} y2={80} />
          <line className="ink" x1={x + 12} y1={92} x2={x + 40} y2={92} />
        </g>
      ))}
      <path id="pix-route" className="ink trace-short" d="M100,100 C150,40 170,40 220,100" />
      <path className="ink trace-short" d="M220,112 C170,170 150,170 100,112" style={{ animationDelay: '0.2s' }} />
      <rect x={-6} y={-6} width={12} height={12} fill="var(--signal)" transform="rotate(45)">
        {animate && (
          <animateMotion dur="2.2s" repeatCount="indefinite" rotate="auto" keyPoints="0;1;1" keyTimes="0;0.55;1" calcMode="spline" keySplines="0.6 0 0.2 1;0 0 1 1">
            <mpath href="#pix-route" />
          </animateMotion>
        )}
      </rect>
      <text x={160} y={186} textAnchor="middle" fontFamily="Archivo, sans-serif" fontSize={13} fontWeight={600} fill="var(--ink-soft)">
        Banco Central, 2020
      </text>
    </svg>
  );
}
