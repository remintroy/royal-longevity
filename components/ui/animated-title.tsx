import { Language } from "@/data/site";

export function AnimatedTitle({ text, lang }: { text: string; lang: Language }) {
  if (lang === "ar") {
    // For Arabic, splitting by word is much safer to preserve ligatures and cursive joining
    const words = text.split(" ");
    return (
      <>
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map((word, i) => (
            <span key={i} className="inline-block whitespace-nowrap">
              <span 
                className="inline-block opacity-0 animate-slide-up-fade" 
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {word}
              </span>
              {i !== words.length - 1 && " "}
            </span>
          ))}
        </span>
      </>
    );
  }

  // For English, we split by words then characters to prevent mid-word line breaks
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wordIdx) => {
          const wordNode = (
            <span key={`word-${wordIdx}`} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIdx) => {
                const delay = charIndex * 0.03;
                charIndex++;
                return (
                  <span 
                    key={charIdx} 
                    className="inline-block opacity-0 animate-slide-up-fade" 
                    style={{ animationDelay: `${delay}s` }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );
          charIndex++; // Increment for the space character delay
          
          return [
            wordNode,
            wordIdx !== words.length - 1 ? " " : null
          ];
        })}
      </span>
    </>
  );
}
