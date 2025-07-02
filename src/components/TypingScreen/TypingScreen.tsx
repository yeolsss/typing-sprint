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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="relative" onClick={handleClick}>
      <div ref={containerRef} className="relative cursor-text p-4 select-none">
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
        textareaRef={textareaRef}
      />
    </div>
  );
}
