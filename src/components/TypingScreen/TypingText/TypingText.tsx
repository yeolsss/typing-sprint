import React from "react";
import Cursor from "@/components/Cursor/Cursor";

interface TypingTextProps {
  words: string[];
  inputValue: string;
  currentWordIndex: number;
  typedWords: string[];
  isFocused: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({
  words,
  inputValue,
  currentWordIndex,
  typedWords,
  isFocused,
}) => {
  const renderWord = (word: string, wordIndex: number) => {
    if (wordIndex === currentWordIndex) {
      const displayText = inputValue.padEnd(word.length + 1, " ");

      return displayText.split("").map((char, charIndex) => {
        const originalChar = word[charIndex];
        const isTyped = charIndex < inputValue.length;
        const isCursor = charIndex === inputValue.length;

        if (isTyped) {
          const isCorrect = char === originalChar;
          return (
            <span
              key={charIndex}
              className={isCorrect ? "text-green-400" : "text-red-400"}
            >
              {char}
            </span>
          );
        } else if (isCursor && isFocused) {
          if (charIndex < word.length) {
            return (
              <span key={charIndex} className="relative text-gray-400">
                {originalChar}
                <Cursor />
              </span>
            );
          } else {
            return (
              <span key={charIndex} className="relative">
                <Cursor />
              </span>
            );
          }
        } else if (isCursor && !isFocused) {
          if (charIndex < word.length) {
            return (
              <span key={charIndex} className="text-gray-400">
                {originalChar}
              </span>
            );
          }
          return null;
        } else {
          return (
            <span key={charIndex} className="text-gray-400">
              {originalChar}
            </span>
          );
        }
      });
    } else if (wordIndex < currentWordIndex) {
      const typedWord = typedWords[wordIndex] || "";
      const maxLength = Math.max(word.length, typedWord.length);

      return Array.from({ length: maxLength }).map((_, charIndex) => {
        const originalChar = word[charIndex] || "";
        const typedChar = typedWord[charIndex] || "";
        const isCorrect = typedChar === originalChar;

        return (
          <span
            key={charIndex}
            className={isCorrect ? "text-green-500" : "text-red-500"}
          >
            {typedChar || originalChar}
          </span>
        );
      });
    } else {
      return word.split("").map((char, charIndex) => (
        <span key={charIndex} className="text-gray-400">
          {char}
        </span>
      ));
    }
  };

  return (
    <div className="flex flex-wrap text-2xl font-bold">
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          data-word-index={wordIdx}
          data-position={wordIdx === currentWordIndex ? "current" : ""}
        >
          {renderWord(word, wordIdx)}
          <span>&nbsp;</span>
        </span>
      ))}
    </div>
  );
};

export default TypingText;
