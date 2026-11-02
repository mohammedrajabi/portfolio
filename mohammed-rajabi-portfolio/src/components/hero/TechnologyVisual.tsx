/** Decorative SVG: no image requests or rendering runtime. */
export function TechnologyVisual() {
  const nodes = [
    [104, 156],
    [206, 88],
    [374, 114],
    [460, 232],
    [416, 398],
    [254, 458],
    [112, 360],
    [192, 246],
    [326, 202],
    [336, 340],
    [238, 354],
    [284, 130],
  ];
  return (
    <div className="technology-visual" aria-hidden="true">
      <div className="technology-ambient" />
      <svg viewBox="0 0 560 560" fill="none" focusable="false">
        <defs>
          <radialGradient id="core-light">
            <stop stopColor="currentColor" stopOpacity=".13" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="network-light"
            x1="90"
            y1="100"
            x2="430"
            y2="440"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="currentColor" stopOpacity=".12" />
            <stop offset=".5" stopColor="currentColor" stopOpacity=".65" />
            <stop offset="1" stopColor="currentColor" stopOpacity=".12" />
          </linearGradient>
        </defs>
        <g className="visual-grid" stroke="currentColor" strokeWidth=".5">
          {[100, 160, 220, 280, 340, 400, 460].map((value) => (
            <path key={value} d={`M${value} 60V500 M60 ${value}H500`} />
          ))}
        </g>
        <circle cx="280" cy="280" r="198" fill="url(#core-light)" />
        <g className="visual-orbits" stroke="currentColor">
          <circle cx="280" cy="280" r="216" strokeOpacity=".16" />
          <circle
            cx="280"
            cy="280"
            r="172"
            strokeOpacity=".16"
            strokeDasharray="2 10"
          />
          <path
            d="M280 64a216 216 0 0 1 206 151 M280 496A216 216 0 0 1 74 345"
            strokeOpacity=".65"
          />
          <circle cx="280" cy="64" r="3" fill="currentColor" />
          <circle cx="280" cy="496" r="3" fill="currentColor" />
        </g>
        <g stroke="url(#network-light)" strokeWidth="1">
          <path d="M104 156 206 88 374 114 460 232 416 398 254 458 112 360 104 156 192 246 206 88M192 246 284 130 374 114 326 202 460 232M112 360 238 354 254 458M238 354 336 340 416 398M192 246 238 354M326 202 336 340M104 156 284 130M112 360 192 246M336 340 460 232" />
        </g>
        <g className="visual-core">
          <path d="m280 202 68 39v78l-68 39-68-39v-78z" className="core-face" />
          <path
            d="m280 202 68 39-68 40-68-40m68 40v77"
            stroke="currentColor"
            strokeOpacity=".7"
          />
          <path
            d="m280 227 45 26v52l-45 26-45-26v-52z"
            stroke="currentColor"
            strokeOpacity=".35"
          />
          <circle cx="280" cy="280" r="5" fill="currentColor" />
          <circle
            cx="280"
            cy="280"
            r="12"
            stroke="currentColor"
            strokeOpacity=".2"
          />
        </g>
        {nodes.map(([x, y], index) => (
          <g key={index}>
            <circle
              cx={x}
              cy={y}
              r={index % 3 === 0 ? 10 : 7}
              fill="currentColor"
              opacity=".06"
            />
            <circle
              cx={x}
              cy={y}
              r={index % 3 === 0 ? 3 : 2}
              fill="currentColor"
              opacity={index % 3 === 0 ? 1 : 0.6}
            />
          </g>
        ))}
        <g stroke="currentColor" strokeOpacity=".3">
          <path d="M50 110V80h30 M480 80h30v30 M510 450v30h-30 M80 480H50v-30" />
        </g>
      </svg>
      <div className="visual-caption">
        <span /> Software. Systems. Security.
      </div>
    </div>
  );
}
