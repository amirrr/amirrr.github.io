"use client";

import React, { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CausalDiagram, { type CausalStructure } from "./CausalDiagram";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

const STRUCTURE_META: Record<
  CausalStructure,
  { name: string; shape: string; blurb: string }
> = {
  confounder: {
    name: "Confounder",
    shape: "A ← C → B",
    blurb:
      "One hidden cause sits behind both variables. The simplest story that accounts for two things moving together.",
  },
  parallel: {
    name: "Parallel mediation",
    shape: "A → M₁ → B, A → M₂ → B",
    blurb:
      "Two independent routes from A to B. If one mechanism looks shaky, the other still carries the link.",
  },
  chained: {
    name: "Chained mediation",
    shape: "A → M₁ → M₂ → M₃ → B",
    blurb:
      "A single long path. Believing it means believing every link in sequence.",
  },
};

/**
 * Bradley-Terry win likelihoods from the pilot (n = 255, 2,550 matchups).
 * `overall` is across all matchups; `high` is restricted to matchups where
 * both explanations were rated highly convincing, where the ranking reverses.
 */
const BT_SCORES: Record<CausalStructure, { overall: number; high: number }> = {
  confounder: { overall: 50, high: 30 },
  parallel: { overall: 32, high: 41 },
  chained: { overall: 18, high: 29 },
};

const CHANCE_BASELINE = 33.3;

interface Correlation {
  id: string;
  question: string;
  a: string;
  b: string;
  shortA: string;
  shortB: string;
  explanations: Record<CausalStructure, string>;
}

/**
 * Two illustrative items in the style of the real stimuli, which were drawn
 * from Tyler Vigen's collection of spurious correlations. Every pairing here
 * is genuinely spurious.
 */
const CORRELATIONS: Correlation[] = [
  {
    id: "arizona-dltr",
    question:
      "Why is food spending in Arizona correlated with Dollar Tree's stock price?",
    a: "Food spending in Arizona",
    b: "Dollar Tree stock price",
    shortA: "Food",
    shortB: "DLTR",
    explanations: {
      confounder:
        "A broader economic trend like inflation could be pushing up everyday food costs in Arizona while also changing how investors value discount retailers like Dollar Tree. That shared trend can make the two move together even if neither is causing the other.",
      parallel:
        "Higher food spending squeezes household budgets, which sends more shoppers toward cheaper stores. Separately, rising grocery totals are read by analysts as a signal of consumer strain, which independently lifts expectations for discount retail stocks.",
      chained:
        "Rising food spending in Arizona pushes suppliers to adjust wholesale pricing, which changes promotional strategy at discount chains, which improves quarterly margin forecasts, which in turn lifts Dollar Tree's share price.",
    },
  },
  {
    id: "cheese-bedsheets",
    question:
      "Why is per capita cheese consumption correlated with deaths from becoming tangled in bedsheets?",
    a: "Cheese consumption",
    b: "Bedsheet-tangling deaths",
    shortA: "Cheese",
    shortB: "Deaths",
    explanations: {
      confounder:
        "Both figures track overall population growth and improvements in record keeping over the same decades. As more people are counted and more causes of death are catalogued precisely, both series drift upward together without either touching the other.",
      parallel:
        "Heavier late-night eating is associated with more restless sleep, which raises the odds of a tangling accident. Independently, richer diets correlate with larger, more heavily layered bedding, which also raises that risk.",
      chained:
        "Higher cheese consumption raises average calorie intake, which worsens sleep apnea rates, which increases nighttime thrashing, which increases fatal entanglement in bedding.",
    },
  },
];

const CONVICTION_LEVELS = [
  "Not convinced",
  "Slightly convinced",
  "Moderately convinced",
  "Very convinced",
] as const;

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

type Phase = "choosing" | "revealed";

export default function ExplanationStyleExplorer() {
  const [itemIndex, setItemIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("choosing");
  const [picked, setPicked] = useState<CausalStructure | null>(null);
  const [conviction, setConviction] = useState<number | null>(null);
  const [showHighConviction, setShowHighConviction] = useState(false);

  const item = CORRELATIONS[itemIndex];

  /**
   * Which two structures are shown, and in which column. Deterministic per
   * item so server and client markup agree, but varied between items.
   */
  const pair = useMemo<[CausalStructure, CausalStructure]>(
    () =>
      itemIndex % 2 === 0
        ? ["confounder", "chained"]
        : ["parallel", "confounder"],
    [itemIndex]
  );

  const chartData = useMemo(
    () =>
      (["confounder", "parallel", "chained"] as CausalStructure[])
        .map((s) => ({
          key: s,
          name: STRUCTURE_META[s].name,
          value: showHighConviction
            ? BT_SCORES[s].high
            : BT_SCORES[s].overall,
        }))
        .sort((x, y) => y.value - x.value),
    [showHighConviction]
  );

  const handleSubmit = () => {
    if (!picked || conviction === null) return;
    // A high-conviction pick is what flips the published ranking, so default
    // the chart to whichever view matches what the reader just did.
    setShowHighConviction(conviction >= 3);
    setPhase("revealed");
  };

  const handleNext = () => {
    setItemIndex((i) => (i + 1) % CORRELATIONS.length);
    setPhase("choosing");
    setPicked(null);
    setConviction(null);
  };

  return (
    <section className="mt-6 rounded-md border bg-card">
      <header className="border-b px-4 py-3">
        <h4 className="font-serif text-sm font-semibold text-foreground">
          Try the experiment
        </h4>
        <p className="mt-1 text-xs text-muted-foreground">
          Below is a real spurious correlation and two explanations for it, in
          the format participants saw. Both are false by construction. Pick the
          one you find more convincing and see how 255 participants ranked its
          causal shape.
        </p>
      </header>

      <div className="space-y-5 p-4">
        <p className="font-serif text-sm font-medium leading-snug text-foreground">
          {item.question}
        </p>

        {/* Explanation options ------------------------------------------- */}
        <div className="grid gap-3 sm:grid-cols-2">
          {pair.map((structure, col) => {
            const isPicked = picked === structure;
            const revealed = phase === "revealed";
            return (
              <button
                key={structure}
                type="button"
                onClick={() => {
                  if (!revealed) setPicked(structure);
                }}
                disabled={revealed}
                aria-pressed={isPicked}
                className={`rounded-md border p-3 text-left transition-colors ${
                  isPicked
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                } ${revealed ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-foreground">
                    {col === 0 ? "Option A" : "Option B"}
                  </span>
                  {revealed && (
                    <Badge
                      variant={isPicked ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {STRUCTURE_META[structure].name}
                    </Badge>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.explanations[structure]}
                </p>
                {revealed && (
                  <div className="mt-3 border-t pt-3">
                    <CausalDiagram
                      structure={structure}
                      labelA={item.shortA}
                      labelB={item.shortB}
                      className="h-auto w-full max-w-[240px]"
                    />
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                      {STRUCTURE_META[structure].shape}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Conviction + submit ------------------------------------------- */}
        {phase === "choosing" && (
          <div className="space-y-3">
            <p className="text-xs font-medium text-foreground">
              How convinced are you by the one you picked?
            </p>
            <div className="flex flex-wrap gap-2">
              {CONVICTION_LEVELS.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setConviction(i)}
                  aria-pressed={conviction === i}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    conviction === i
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!picked || conviction === null}
            >
              Submit and compare
            </Button>
          </div>
        )}

        {/* Results -------------------------------------------------------- */}
        {phase === "revealed" && picked && (
          <div className="space-y-4">
            <div className="rounded-md bg-muted/40 p-3">
              <p className="text-xs leading-relaxed text-foreground">
                You picked a{" "}
                <strong>
                  {STRUCTURE_META[picked].name.toLowerCase()}
                </strong>{" "}
                explanation and were{" "}
                <strong>
                  {CONVICTION_LEVELS[conviction ?? 0].toLowerCase()}
                </strong>
                . {STRUCTURE_META[picked].blurb}
              </p>
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-medium text-foreground">
                  Bradley–Terry win likelihood
                </p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setShowHighConviction(false)}
                    aria-pressed={!showHighConviction}
                    className={`rounded px-2 py-0.5 text-[11px] transition-colors ${
                      !showHighConviction
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All matchups
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowHighConviction(true)}
                    aria-pressed={showHighConviction}
                    className={`rounded px-2 py-0.5 text-[11px] transition-colors ${
                      showHighConviction
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    High conviction only
                  </button>
                </div>
              </div>

              <div className="h-[140px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 4, right: 40, bottom: 4, left: 4 }}
                  >
                    <XAxis type="number" domain={[0, 60]} hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={110}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }}
                    />
                    <ReferenceLine
                      x={CHANCE_BASELINE}
                      strokeDasharray="3 3"
                      stroke="hsl(var(--muted-foreground))"
                      label={{
                        value: "chance",
                        position: "top",
                        fontSize: 9,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      radius={[0, 3, 3, 0]}
                      label={{
                        position: "right",
                        formatter: (v: number) => `${v}%`,
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                    >
                      {chartData.map((d) => (
                        <Cell
                          key={d.key}
                          fill={
                            d.key === picked
                              ? "hsl(var(--primary))"
                              : "hsl(var(--muted-foreground))"
                          }
                          opacity={d.key === picked ? 1 : 0.35}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {showHighConviction
                  ? "Restricted to matchups where both explanations were rated highly convincing. Parallel mediators overtake confounders: under deeper engagement people reward robustness over simplicity."
                  : "Across all 2,550 matchups. Confounders win about half the time against a 33% baseline, and long chains come last."}
              </p>
            </div>

            <Button size="sm" variant="outline" onClick={handleNext}>
              Try another correlation
            </Button>
          </div>
        )}
      </div>

      <footer className="border-t px-4 py-2">
        <p className="text-[11px] text-muted-foreground">
          Figures are pilot estimates (n = 255). Explanation texts here are
          illustrative rewrites in the style of the study's model-generated
          stimuli.
        </p>
      </footer>
    </section>
  );
}
