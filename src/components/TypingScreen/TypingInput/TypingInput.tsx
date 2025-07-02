import React, { useEffect, useRef } from "react";

interface TypingInputProps {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const TypingInput: React.FC<TypingInputProps> = ({
  inputValue,
  handleInputChange,
  handleKeyDown,
  handleFocus,
  handleBlur,
  containerRef,
  textareaRef,
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
        position: "absolute",
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
      />
    </div>
  );
};

export default TypingInput;
