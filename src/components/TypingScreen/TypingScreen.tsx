"use client";
import React, { useEffect, useRef, useState } from "react";

export default function TypingPractice() {
  const [inputValue, setInputValue] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [textareaPosition, setTextareaPosition] = useState({ x: 0, y: 0 });
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const text =
    "굳이 내가 이탈리아어를 배워야 할 필요는 없었다. 이탈리아에 살지 않았고 이탈리아 친구도 없었다. 난 이탈리아어를 갈망 했을 뿐이다. 하지만 결국 갈망은 미친 듯 원하는 욕망과 다르지 않다. 많은 열정적인 관계가 그렇듯 이탈리아어에 대한 내 열광은 애착, 집착이 될 터였다. 이성을 잃는, 응답받지 못하는 원가가 늘 존재하겠지. 난 이탈리아어와 사랑에 빠졌지만 내가 사랑하는 대상은 내게 무관심하다. 이탈리아어는 날 절대 갈망하지 않을 거였다.";
  const words = text.split(" ");

  const updateTextareaPosition = () => {
    if (containerRef.current) {
      const currentSpan = containerRef.current.querySelector(
        `[data-position="current"]`,
      ) as HTMLSpanElement;

      if (currentSpan) {
        const rect = currentSpan.getBoundingClientRect();
        setTextareaPosition({
          x: rect.left,
          y: rect.top,
        });
      }
    }
  };

  useEffect(() => {
    updateTextareaPosition();
  }, [currentWordIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    /*TODO: 한글 입력 후 enter처리하면 2번 반복하는 문제 발생
     * 한글 입력 후 Enter 키를 누르면 이벤트가 2번 발생하는 현상은 IME(Input Method Editor)의 특성 때문
     * isComposing 속성을 확인하면 해결 할 수 있다.
     *
     * 한글은 자음과 모음을 조합하여 하나의 글자를 만드는 과정을 거칩니다.
     * 예를 들어 “한”이라는 글자를 입력하려면 “ㅎ”, “ㅏ”, “ㄴ” 세 개의 키 입력이 필요합니다.
     * 이 과정에서 IME가 동작하여 composition 단계를 거치게 되고, 이때 키보드 이벤트가 중복으로 발생합니다.
     * */
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      if (inputValue.trim()) {
        const currentTypedWord = inputValue.trim();
        setTypedWords((prev) => [...prev, currentTypedWord]);
        setCurrentWordIndex((prev) => Math.min(prev + 1, words.length - 1));
        setInputValue("");
      }
    }

    if (e.key === "Backspace") {
      if (!inputValue.length && currentWordIndex > 0) {
        e.preventDefault();

        const prevWordIndex = currentWordIndex - 1;
        const prevTypedWord = typedWords[prevWordIndex] || "";

        setInputValue(prevTypedWord);
        setCurrentWordIndex(prevWordIndex);

        setTypedWords((prev) => prev.slice(0, -1));
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setInputValue(value);

    if (value.endsWith(" ") && value.trim()) {
      const currentTypedWord = value.trim();
      setTypedWords((prev) => [...prev, currentTypedWord]);
      setCurrentWordIndex((prev) => Math.min(prev + 1, words.length - 1));
      setInputValue("");
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClick = () => {
    if (textareaRef.current) textareaRef.current.focus();
  };

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
              className={isCorrect ? "text-green-500" : "text-red-500"}
            >
              {char}
            </span>
          );
        } else if (isCursor && isFocused) {
          if (charIndex < word.length) {
            return (
              <span key={charIndex} className="relative text-gray-400">
                {originalChar}
                <span className="animate-blink absolute top-0.5 left-0 h-6 w-0.5 bg-black"></span>
              </span>
            );
          } else {
            return (
              <span key={charIndex} className="relative">
                <span className="animate-blink absolute top-0.5 left-0 h-6 w-0.5 bg-black"></span>
              </span>
            );
          }
        } else if (isCursor && !isFocused) {
          // focus가 없을 때는 커서 없이 원본 글자만 표시
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
    <div className="relative">
      <div
        ref={containerRef}
        className="relative cursor-text p-4 select-none"
        onClick={handleClick}
      >
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
      </div>

      <div
        ref={textareaContainerRef}
        className="z-10"
        style={{
          left: `${textareaPosition.x}px`,
          top: `${textareaPosition.y}px`,
        }}
      >
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="no-scrollbar h-6 w-32 resize-none border-none bg-transparent text-lg text-transparent caret-transparent outline-none"
          spellCheck={false}
          autoFocus
          translate="no"
        />
      </div>
    </div>
  );
}
