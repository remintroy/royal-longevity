import { Fragment } from "react";
import type { Language } from "@/data/site";

/** Keep Arabic words intact so their joined letterforms survive the reveal. */
export function AnimatedTitle({ text, lang }: { text: string; lang: Language }) {
  const lines = text.split("\n").map((line) => line.trim().split(/\s+/));

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" lang={lang}>
        {lines.map((words, lineIndex) => {
          const precedingWords = lines.slice(0, lineIndex).reduce((count, line) => count + line.length, 0);

          return (
            <span className="hero-line" key={lineIndex}>
              {words.map((word, wordIndex) => (
                <Fragment key={wordIndex}>
                  {wordIndex > 0 && " "}
                  <span
                    className="hero-word"
                    style={{ animationDelay: `${120 + (precedingWords + wordIndex) * 65}ms` }}
                  >
                    {word}
                  </span>
                </Fragment>
              ))}
            </span>
          );
        })}
      </span>
    </>
  );
}
