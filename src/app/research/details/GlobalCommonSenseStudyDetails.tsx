"use client";

import React, { useState } from "react";
import Image from "next/image";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ExternalLink, Github, FileText } from "lucide-react";
import type { ResearchDetailProps } from "@/app/research/components/ResearchCard";

const STATEMENTS = [
  "It is common sense that the sky is blue on a clear day.",
  "It is common sense that you should say 'thank you' when someone does you a favor.",
  "It is common sense that fish can breathe underwater.",
  "It is common sense that all birds can fly.",
  "It is common sense that reading in dim light is bad for your eyes.",
];

// Predefined "actual" majority opinions for the statements (1 for Yes, 0 for No)
// 1. Sky is blue: Yes (1)
// 2. Say thank you: Yes (1)
// 3. Fish breathe underwater: Yes (1)
// 4. All birds can fly: No (0)
// 5. Reading in dim light bad for eyes: Yes (1) (as a common belief)
const ACTUAL_MAJORITY_OPINIONS = [1, 1, 1, 0, 1];

interface Answer {
  userOpinion: "yes" | "no" | null;
  userPrediction: "yes" | "no" | null;
}

export default function GlobalCommonSenseStudyDetails({
  markdownContent,
  links,
}: ResearchDetailProps) {
  const [answers, setAnswers] = useState<Answer[]>(
    STATEMENTS.map(() => ({ userOpinion: null, userPrediction: null }))
  );
  const [mjScore, setMjScore] = useState<number | null>(null);
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  const handleAnswerChange = (
    statementIndex: number,
    questionType: "userOpinion" | "userPrediction",
    value: "yes" | "no"
  ) => {
    const newAnswers = [...answers];
    newAnswers[statementIndex][questionType] = value;
    setAnswers(newAnswers);
    setSurveySubmitted(false); // Reset submission status if answers change
    setMjScore(null);
  };

  const calculateMjScore = () => {
    let consensusCorrect = 0;
    let awarenessCorrect = 0;

    answers.forEach((answer, index) => {
      const userOpinionNumeric = answer.userOpinion === "yes" ? 1 : 0;
      const userPredictionNumeric = answer.userPrediction === "yes" ? 1 : 0;
      const actualMajority = ACTUAL_MAJORITY_OPINIONS[index];

      if (
        answer.userOpinion !== null &&
        userOpinionNumeric === actualMajority
      ) {
        consensusCorrect++;
      }
      if (
        answer.userPrediction !== null &&
        userPredictionNumeric === actualMajority
      ) {
        awarenessCorrect++;
      }
    });

    const Cj = STATEMENTS.length > 0 ? consensusCorrect / STATEMENTS.length : 0;
    const Aj = STATEMENTS.length > 0 ? awarenessCorrect / STATEMENTS.length : 0;

    const score = Math.sqrt(Cj * Aj);
    setMjScore(isNaN(score) ? 0 : score); // Handle potential NaN if Cj or Aj is 0
    setSurveySubmitted(true);
  };

  const isSurveyComplete = answers.every(
    (answer) => answer.userOpinion !== null && answer.userPrediction !== null
  );

  return (
    <div className="py-4 space-y-8">
      <MarkdownRenderer
        content={markdownContent}
        className="prose-sm max-w-none dark:prose-invert"
      />

      <section>
        <h3 className="text-lg font-semibold font-serif text-foreground mb-3">
          Key Resources & Links
        </h3>
        <div className="space-y-2">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary hover:underline mr-4"
            >
              {link.name.toLowerCase().includes("github") ? (
                <Github className="mr-1.5 h-4 w-4" />
              ) : link.name.toLowerCase().includes("paper") ||
                link.name.toLowerCase().includes("pnas") ? (
                <FileText className="mr-1.5 h-4 w-4" />
              ) : link.name.toLowerCase().includes("platform") ? (
                <ExternalLink className="mr-1.5 h-4 w-4" />
              ) : (
                <ExternalLink className="mr-1.5 h-4 w-4" />
              )}
              {link.name}
            </a>
          ))}
        </div>
      </section>

      {/* <section>
        <h3 className="text-lg font-semibold font-serif text-foreground mb-3">
          Common Sense Distributions (Illustrative)
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-3 border rounded-md bg-muted/30">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Placeholder for common sense distribution chart 1"
              width={600}
              height={400}
              className="rounded shadow"
              data-ai-hint="distribution chart"
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Illustrative Plot 1: Perceived Commonality of Statements
            </p>
          </div>
          <div className="p-3 border rounded-md bg-muted/30">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Placeholder for common sense distribution chart 2"
              width={600}
              height={400}
              className="rounded shadow"
              data-ai-hint="agreement chart"
            />
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Illustrative Plot 2: Agreement on Common Sense
            </p>
          </div>
        </div>
      </section> */}

      <section className="p-4 border border-dashed rounded-md bg-card">
        <h3 className="text-lg font-semibold font-serif text-foreground mb-4">
          Mini Common Sense Survey
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Participate in a simplified version of our survey. Your answers help
          calculate your "Commonsensicality Score (Mj)" based on the framework
          from our research.
        </p>
        <div className="space-y-6">
          {STATEMENTS.map((statement, index) => (
            <div
              key={index}
              className="p-3 border rounded-md bg-background shadow-sm"
            >
              <p className="text-sm font-medium text-foreground mb-3">
                {index + 1}. "{statement}"
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    Your opinion: Is this common sense?
                  </Label>
                  <RadioGroup
                    value={answers[index].userOpinion || undefined}
                    onValueChange={(value: "yes" | "no") =>
                      handleAnswerChange(index, "userOpinion", value)
                    }
                    className="flex space-x-3"
                  >
                    <div className="flex items-center space-x-1.5">
                      <RadioGroupItem
                        value="yes"
                        id={`userOpinion-yes-${index}`}
                      />
                      <Label
                        htmlFor={`userOpinion-yes-${index}`}
                        className="text-sm font-normal"
                      >
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <RadioGroupItem
                        value="no"
                        id={`userOpinion-no-${index}`}
                      />
                      <Label
                        htmlFor={`userOpinion-no-${index}`}
                        className="text-sm font-normal"
                      >
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    Prediction: Do most people think this is common sense?
                  </Label>
                  <RadioGroup
                    value={answers[index].userPrediction || undefined}
                    onValueChange={(value: "yes" | "no") =>
                      handleAnswerChange(index, "userPrediction", value)
                    }
                    className="flex space-x-3"
                  >
                    <div className="flex items-center space-x-1.5">
                      <RadioGroupItem
                        value="yes"
                        id={`userPrediction-yes-${index}`}
                      />
                      <Label
                        htmlFor={`userPrediction-yes-${index}`}
                        className="text-sm font-normal"
                      >
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <RadioGroupItem
                        value="no"
                        id={`userPrediction-no-${index}`}
                      />
                      <Label
                        htmlFor={`userPrediction-no-${index}`}
                        className="text-sm font-normal"
                      >
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          onClick={calculateMjScore}
          disabled={!isSurveyComplete || surveySubmitted}
          className="mt-6"
        >
          {surveySubmitted
            ? "Score Calculated!"
            : "Calculate My Commonsensicality Score (Mj)"}
        </Button>
        {mjScore !== null && (
          <div className="mt-4 p-3 bg-primary/10 rounded-md">
            <p className="text-md font-semibold text-primary">
              Your Commonsensicality Score (Mj) is: {mjScore.toFixed(3)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              This score (0 to 1) reflects your alignment with and awareness of
              majority opinions for these statements.
            </p>
          </div>
        )}
      </section>

      <section>
        <h3 className="text-lg font-semibold font-serif text-foreground mb-3">
          Scoring Formula Explained
        </h3>
        <div className="flex justify-center p-4 bg-muted/30 rounded overflow-x-auto mb-2">
          <math
            xmlns="http://www.w3.org/1998/Math/MathML"
            display="block"
            style={{ fontSize: "1.3rem", color: "hsl(var(--foreground))" }}
          >
            <mrow>
              <msub>
                <mi>M</mi>
                <mi>j</mi>
              </msub>
              <mo>=</mo>
              <msqrt>
                <mrow>
                  <msub>
                    <mi>C</mi>
                    <mi>j</mi>
                  </msub>
                  <msub>
                    <mi>A</mi>
                    <mi>j</mi>
                  </msub>
                </mrow>
              </msqrt>
            </mrow>
          </math>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            <strong className="text-foreground">Mj:</strong> Your individual
            commonsensicality score for this set of statements.
          </p>
          <p>
            <strong className="text-foreground">Cj (Consensus):</strong> The
            fraction of statements where your own opinion coincides with the
            predefined majority opinion. (Value:{" "}
            {(
              answers.filter(
                (ans, i) =>
                  (ans.userOpinion === "yes" ? 1 : 0) ===
                  ACTUAL_MAJORITY_OPINIONS[i]
              ).length / STATEMENTS.length
            ).toFixed(2) || "N/A"}
            )
          </p>
          <p>
            <strong className="text-foreground">Aj (Awareness):</strong> Your
            accuracy in predicting the predefined majority opinion across the
            statements. (Value:{" "}
            {(
              answers.filter(
                (ans, i) =>
                  (ans.userPrediction === "yes" ? 1 : 0) ===
                  ACTUAL_MAJORITY_OPINIONS[i]
              ).length / STATEMENTS.length
            ).toFixed(2) || "N/A"}
            )
          </p>
          <p className="text-xs mt-2">
            This approach is based on the framework for quantifying common sense
            detailed in our PNAS publications.
          </p>
        </div>
      </section>
    </div>
  );
}
