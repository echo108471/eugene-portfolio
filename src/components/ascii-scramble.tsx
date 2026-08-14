import React, { useState, useRef, useEffect, useCallback } from "react";

const GLYPHS = "*+@#%~=-/\\|░▒▓·o01";

interface AsciiScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  triggerOnHover?: boolean;
  activeOnMount?: boolean;
}

export const AsciiScrambleText: React.FC<AsciiScrambleTextProps> = ({
  text,
  className = "",
  as: Component = "span",
  triggerOnHover = true,
  activeOnMount = false,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef<number | null>(null);

  const scramble = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
    }

    setIsScrambling(true);
    let frame = 0;
    const maxFrames = Math.min(18, Math.max(10, Math.floor(text.length * 0.8)));

    const update = () => {
      frame += 1;
      const progress = frame / maxFrames;

      const output = text
        .split("")
        .map((char, index) => {
          if (char === " " || char === "\n") return char;
          // As progress increases, characters from left to right lock into the actual char
          if (index / text.length < progress * 0.95) {
            return char;
          }
          const randomGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          return randomGlyph;
        })
        .join("");

      setDisplayText(output);

      if (frame < maxFrames) {
        frameRef.current = window.requestAnimationFrame(update);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
        frameRef.current = null;
      }
    };

    frameRef.current = window.requestAnimationFrame(update);
  }, [text]);

  useEffect(() => {
    setDisplayText(text);
    if (activeOnMount) {
      scramble();
    }
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, activeOnMount, scramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isScrambling) {
      scramble();
    }
  };

  return (
    <Component
      className={`ascii-scramble-text inline-block transition-colors duration-200 ${
        isScrambling ? "text-[var(--growth-bright)] text-glow-growth" : ""
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      data-original-text={text}
    >
      {displayText}
    </Component>
  );
};

export default AsciiScrambleText;
