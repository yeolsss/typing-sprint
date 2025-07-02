"use client";

import React, { useRef } from "react";
import TypingText from "@/components/TypingScreen/TypingText/TypingText";
import TypingInput from "@/components/TypingScreen/TypingInput/TypingInput";
import { useTyping } from "@/hooks/useTyping";

export default function TypingPractice() {
  const {
    inputValue,
    currentWordIndex,
    typedWords,
    isFocused,
    words,
    handleKeyDown,
    handleInputChange,
    handleFocus,
    handleBlur,
  } = useTyping();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const textarea = containerRef.current?.querySelector("textarea");
    if (textarea) {
      textarea.focus();
    }
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative cursor-text p-4 select-none"
        onClick={handleClick}
      >
        <TypingText
          words={words}
          inputValue={inputValue}
          currentWordIndex={currentWordIndex}
          typedWords={typedWords}
          isFocused={isFocused}
        />
      </div>

      <TypingInput
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        containerRef={containerRef}
      />
    </div>
  );
}
