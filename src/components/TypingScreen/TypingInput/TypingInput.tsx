import React, { useEffect, useRef } from "react";

interface TypingInputProps {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const TypingInput: React.FC<TypingInputProps> = ({
  inputValue,
  handleInputChange,
  handleKeyDown,
  handleFocus,
  handleBlur,
  containerRef,
  inputRef,
}) => {
  const textareaContainerRef = useRef<HTMLDivElement>(null);
  const [textareaPosition, setTextareaPosition] = React.useState({
    x: 0,
    y: 0,
  });

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
  }, [inputValue]);

  return (
    <div
      ref={textareaContainerRef}
      className="z-10"
      style={{
        left: `${textareaPosition.x}px`,
        top: `${textareaPosition.y}px`,
      }}
    >
      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="no-scrollbar h-6 w-32 resize-none border-none bg-transparent text-lg text-transparent caret-transparent outline-none"
        spellCheck={false}
      />
    </div>
  );
};

export default TypingInput;
