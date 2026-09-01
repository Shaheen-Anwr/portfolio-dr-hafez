"use client";

import { useId, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

type Labels = { antecedent: string; mediator: string; outcome: string };

/**
 * A structural mediation model — the shape of nearly every study in Dr. Farid's
 * record ("M as a mediating variable between X and Y"). Pure SVG so it scales
 * cleanly and doubles as the site's identity figure.
 *
 * a  = antecedent → mediator
 * b  = mediator → outcome
 * c′ = antecedent → outcome (direct effect, dashed)
 */
export function MediationDiagram({
  labels,
  animate = false,
  mediatorGlyph,
  mediatorSubLabel,
  className,
}: {
  labels: Labels;
  animate?: boolean;
  /** Text rendered inside the mediator node instead of its label (e.g. a monogram). */
  mediatorGlyph?: string;
  /** Small caption under the mediator node when `mediatorGlyph` is used. */
  mediatorSubLabel?: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const arrow = `arrow-${uid}`;
  const arrowLive = `arrowlive-${uid}`;
  const grad = `grad-${uid}`;

  // Geometry — viewBox 0 0 300 300
  const M = { x: 150, y: 62, r: 43 };
  const A = { x: 10, y: 196, w: 122, h: 58 };
  const O = { x: 168, y: 196, w: 122, h: 58 };
  const edge = animate ? "diagram-edge" : "";
  const node = animate ? "diagram-node" : "";
  const s = (delay: number, len?: number): CSSProperties =>
    ({ animationDelay: `${delay}s`, ...(len ? { "--edge-len": len } : {}) }) as CSSProperties;

  return (
    <svg
      viewBox="0 0 300 300"
      className={cn("h-full w-full overflow-visible", className)}
      role="img"
      aria-label={`Mediation model: ${labels.antecedent} to ${labels.outcome}, mediated by ${labels.mediator}`}
    >
      <defs>
        <marker id={arrow} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--color-edge)" />
        </marker>
        <marker id={arrowLive} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--color-edge-strong)" />
        </marker>
        <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#bcc3ce" />
        </linearGradient>
      </defs>

      {/* c′ — direct effect, dashed */}
      <line
        x1={A.x + A.w} y1={A.y + A.h / 2}
        x2={O.x} y2={O.y + O.h / 2}
        className={cn("edge", edge)}
        strokeDasharray="5 5"
        style={animate ? s(0.55, 40) : undefined}
        markerEnd={`url(#${arrow})`}
      />

      {/* a — antecedent → mediator */}
      <path
        d={`M ${A.x + A.w * 0.6} ${A.y} C ${A.x + A.w * 0.46} ${A.y - 48}, ${M.x - M.r - 4} ${M.y + 60}, ${M.x - M.r * 0.72} ${M.y + M.r * 0.68}`}
        className={cn("edge edge-live", edge)}
        style={animate ? s(0.05, 210) : undefined}
        markerEnd={`url(#${arrowLive})`}
      />

      {/* b — mediator → outcome */}
      <path
        d={`M ${M.x + M.r * 0.72} ${M.y + M.r * 0.68} C ${M.x + M.r + 4} ${M.y + 60}, ${O.x + O.w * 0.54} ${O.y - 48}, ${O.x + O.w * 0.4} ${O.y}`}
        className={cn("edge edge-live", edge)}
        style={animate ? s(0.3, 210) : undefined}
        markerEnd={`url(#${arrowLive})`}
      />

      {/* path coefficients */}
      <text x={A.x + A.w * 0.52 - 8} y={M.y + 104} className="path-tag" textAnchor="end">a</text>
      <text x={O.x + O.w * 0.48 + 8} y={M.y + 104} className="path-tag" textAnchor="start">b</text>
      <text x="150" y={A.y + A.h / 2 - 9} className="path-tag" textAnchor="middle">c′</text>

      {/* antecedent */}
      <g className={node} style={animate ? s(0.9) : undefined}>
        <rect x={A.x} y={A.y} width={A.w} height={A.h} rx="12" fill="var(--color-surface-2)" stroke="var(--color-line-strong)" />
        <Wrapped x={A.x + A.w / 2} y={A.y + A.h / 2} width={A.w - 16} text={labels.antecedent} />
      </g>

      {/* outcome */}
      <g className={node} style={animate ? s(1.05) : undefined}>
        <rect x={O.x} y={O.y} width={O.w} height={O.h} rx="12" fill="var(--color-surface-2)" stroke="var(--color-line-strong)" />
        <Wrapped x={O.x + O.w / 2} y={O.y + O.h / 2} width={O.w - 16} text={labels.outcome} />
      </g>

      {/* mediator */}
      <g className={node} style={animate ? s(1.2) : undefined}>
        <circle
          cx={M.x} cy={M.y} r={M.r}
          fill="color-mix(in oklab, var(--color-accent) 12%, var(--color-panel))"
          stroke="var(--color-accent)"
          strokeOpacity="0.6"
        />
        {mediatorGlyph ? (
          <>
            <text
              x={M.x} y={M.y} textAnchor="middle" dominantBaseline="central"
              style={{ fontFamily: "var(--font-display), var(--font-arabic)", fontWeight: 700, fontSize: 30, fill: `url(#${grad})` }}
            >
              {mediatorGlyph}
            </text>
            {mediatorSubLabel ? (
              <text x={M.x} y={M.y + M.r + 19} className="node-label" textAnchor="middle" style={{ fill: "var(--color-accent)" }}>
                {mediatorSubLabel}
              </text>
            ) : null}
          </>
        ) : (
          <Wrapped x={M.x} y={M.y} width={M.r * 1.7} text={labels.mediator} fill="var(--color-ink)" weight={600} />
        )}
      </g>
    </svg>
  );
}

/** Center-anchored SVG text that wraps to at most two lines by word count. */
function Wrapped({
  x, y, width, text, fill = "var(--color-muted)", weight = 400,
}: { x: number; y: number; width: number; text: string; fill?: string; weight?: number }) {
  const words = text.split(" ");
  const fitsOneLine = text.length * 6.4 <= width;
  let lines: string[];
  if (fitsOneLine || words.length === 1) {
    lines = [text];
  } else {
    let cut = Math.ceil(words.length / 2);
    while (cut > 1 && words.slice(0, cut).join(" ").length > words.slice(cut).join(" ").length + 4) cut -= 1;
    lines = [words.slice(0, cut).join(" "), words.slice(cut).join(" ")];
  }
  const lh = 12.5;
  const startY = y - ((lines.length - 1) * lh) / 2 + 3.5;
  return (
    <text x={x} textAnchor="middle" className="node-label" style={{ fill, fontWeight: weight }}>
      {lines.map((ln, i) => (
        <tspan key={i} x={x} y={startY + i * lh}>{ln}</tspan>
      ))}
    </text>
  );
}
