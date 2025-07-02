"use client";

import React, { useEffect, useRef } from "react";
import TypingText from "@/components/TypingScreen/TypingText/TypingText";
import TypingInput from "@/components/TypingScreen/TypingInput/TypingInput";
import { useTyping } from "@/hooks/useTyping";
import TypingStats from "@/components/TypingScreen/TypingStats/typingStats";

export default function TypingPractice() {
  const {
    inputValue,
    currentWordIndex,
    typedWords,
    isFocused,
    words,
    isCompleted,
    isStarted,
    currentStats,
    handleKeyDown,
    handleInputChange,
    handleFocus,
    handleBlur,
  } = useTyping();

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* 통계 표시 */}
      {isStarted && (
        <div className="mb-6">
          <TypingStats
            cpm={currentStats.cpm}
            wpm={currentStats.wpm}
            accuracy={currentStats.accuracy}
            isCompleted={isCompleted}
          />
        </div>
      )}

      {/* 타이핑 영역 */}
      <div className="">
        <div
          ref={containerRef}
          className="cursor-text p-4 select-none"
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
          inputRef={textareaRef}
        />
      </div>
    </div>
  );
}
