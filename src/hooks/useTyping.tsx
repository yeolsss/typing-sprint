import { useCallback, useState } from "react";

const text =
  "굳이 내가 이탈리아어를 배워야 할 필요는 없었다. 이탈리아에 살지 않았고 이탈리아 친구도 없었다. 난 이탈리아어를 갈망 했을 뿐이다. 하지만 결국 갈망은 미친 듯 원하는 욕망과 다르지 않다. 많은 열정적인 관계가 그렇듯 이탈리아어에 대한 내 열광은 애착, 집착이 될 터였다. 이성을 잃는, 응답받지 못하는 원가가 늘 존재하겠지. 난 이탈리아어와 사랑에 빠졌지만 내가 사랑하는 대상은 내게 무관심하다. 이탈리아어는 날 절대 갈망하지 않을 거였다.";
const words = text.split(" ");

export const useTyping = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    },
    [inputValue, currentWordIndex, typedWords],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setInputValue(value);

      if (value.endsWith(" ") && value.trim()) {
        const currentTypedWord = value.trim();
        setTypedWords((prev) => [...prev, currentTypedWord]);
        setCurrentWordIndex((prev) => Math.min(prev + 1, words.length - 1));
        setInputValue("");
      }
    },
    [],
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return {
    inputValue,
    currentWordIndex,
    typedWords,
    isFocused,
    words,
    handleKeyDown,
    handleInputChange,
    handleFocus,
    handleBlur,
  };
};
