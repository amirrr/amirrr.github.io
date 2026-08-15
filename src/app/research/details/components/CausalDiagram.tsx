"use client";

export type CausalStructure = "confounder" | "parallel" | "chained";

interface CausalDiagramProps {
  structure: CausalStructure;
  /** Optional labels for the two correlated variables. */
  labelA?: string;
  labelB?: string;
  className?: string;
}

const NODE_R = 15;

function Node({
  x,
  y,
  label,
  variant = "mediator",
}: {
  x: number;
  y: number;
  label: string;
  variant?: "endpoint" | "mediator";
}) {
  const isEndpoint = variant === "endpoint";
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={NODE_R}
        className={
          isEndpoint
            ? "fill-primary stroke-primary"
            : "fill-background stroke-muted-foreground"
        }
        strokeWidth={1.5}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className={`text-[11px] font-medium ${
          isEndpoint ? "fill-primary-foreground" : "fill-foreground"
        }`}
      >
        {label}
      </text>
    </g>
  );
}

/**
 * Draws an arrow between two node centres, stopping short of each node's
 * radius so the arrowhead sits cleanly on the circle's edge.
 */
function Arrow({
  from,
  to,
}: {
  from: [number, number];
  to: [number, number];
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;

  const startX = x1 + ux * NODE_R;
  const startY = y1 + uy * NODE_R;
  // Extra 5px so the marker tip, not the line end, touches the circle.
  const endX = x2 - ux * (NODE_R + 5);
  const endY = y2 - uy * (NODE_R + 5);

  return (
    <line
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      className="stroke-muted-foreground"
      strokeWidth={1.5}
      markerEnd="url(#causal-arrowhead)"
    />
  );
}

export default function CausalDiagram({
  structure,
  labelA = "A",
  labelB = "B",
  className,
}: CausalDiagramProps) {
  return (
    <svg
      viewBox="0 0 280 110"
      className={className}
      role="img"
      aria-label={
        structure === "confounder"
          ? `${labelA} and ${labelB} share a hidden common cause C`
          : structure === "parallel"
          ? `${labelA} affects ${labelB} through two independent mediators`
          : `${labelA} affects ${labelB} through three sequential mediators`
      }
    >
      <defs>
        <marker
          id="causal-arrowhead"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted-foreground" />
        </marker>
      </defs>

      {structure === "confounder" && (
        <>
          <Arrow from={[140, 28]} to={[45, 82]} />
          <Arrow from={[140, 28]} to={[235, 82]} />
          <Node x={140} y={28} label="C" />
          <Node x={45} y={82} label={labelA} variant="endpoint" />
          <Node x={235} y={82} label={labelB} variant="endpoint" />
        </>
      )}

      {structure === "parallel" && (
        <>
          <Arrow from={[32, 55]} to={[140, 24]} />
          <Arrow from={[140, 24]} to={[248, 55]} />
          <Arrow from={[32, 55]} to={[140, 86]} />
          <Arrow from={[140, 86]} to={[248, 55]} />
          <Node x={140} y={24} label="M₁" />
          <Node x={140} y={86} label="M₂" />
          <Node x={32} y={55} label={labelA} variant="endpoint" />
          <Node x={248} y={55} label={labelB} variant="endpoint" />
        </>
      )}

      {structure === "chained" && (
        <>
          <Arrow from={[24, 55]} to={[88, 55]} />
          <Arrow from={[88, 55]} to={[152, 55]} />
          <Arrow from={[152, 55]} to={[216, 55]} />
          <Arrow from={[216, 55]} to={[256, 55]} />
          <Node x={24} y={55} label={labelA} variant="endpoint" />
          <Node x={88} y={55} label="M₁" />
          <Node x={152} y={55} label="M₂" />
          <Node x={216} y={55} label="M₃" />
          <Node x={256} y={55} label={labelB} variant="endpoint" />
        </>
      )}
    </svg>
  );
}
