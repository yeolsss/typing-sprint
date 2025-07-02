import { useCallback, useState } from "react";

// const text =
//   "굳이 내가 이탈리아어를 배워야 할 필요는 없었다. 이탈리아에 살지 않았고 이탈리아 친구도 없었다. 난 이탈리아어를 갈망 했을 뿐이다. 하지만 결국 갈망은 미친 듯 원하는 욕망과 다르지 않다. 많은 열정적인 관계가 그렇듯 이탈리아어에 대한 내 열광은 애착, 집착이 될 터였다. 이성을 잃는, 응답받지 못하는 원가가 늘 존재하겠지. 난 이탈리아어와 사랑에 빠졌지만 내가 사랑하는 대상은 내게 무관심하다. 이탈리아어는 날 절대 갈망하지 않을 거였다.";
const text =
  "부부란 둘이 서로 반씩 되는 것이 아니라, 하나로서 전체가 되는 것이다.";
const words = text.split(" ");

interface TypingStats {
  cpm: number;
  wpm: number;
  accuracy: number;
  totalCharacters: number;
  correctCharacters: number;
  totalWords: number;
  correctWords: number;
}

export const useTyping = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  // 타이핑 시작 처리
  const startTyping = useCallback(() => {
    console.log("시작");
    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());
    }
  }, [isStarted]);

  // 타이핑 완료 처리
  const completeTyping = useCallback(() => {
    if (!isCompleted) {
      setIsCompleted(true);
      setEndTime(Date.now());
    }
  }, [isCompleted]);

  // 실시간 통계 계산
  const calculateStats = useCallback((): TypingStats => {
    const currentTime = Date.now();
    const elapsedMinutes = startTime ? (currentTime - startTime) / 60000 : 0;

    // 현재 단어까지의 정확성 계산
    let totalChars = 0;
    let correctChars = 0;
    let correctWordsCount = 0;

    // 완료된 단어들 계산
    for (let i = 0; i < currentWordIndex; i++) {
      const originalWord = words[i];
      const typedWord = typedWords[i] || "";

      totalChars += typedWord.length;

      // 문자별 정확성 계산
      for (
        let j = 0;
        j < Math.max(originalWord.length, typedWord.length);
        j++
      ) {
        if (originalWord[j] === typedWord[j] && originalWord[j] !== undefined) {
          correctChars++;
        }
      }

      // 단어 정확성 계산
      if (originalWord === typedWord) {
        correctWordsCount++;
      }
    }

    // 현재 입력 중인 단어 계산
    if (currentWordIndex < words.length) {
      const currentOriginalWord = words[currentWordIndex];
      totalChars += inputValue.length;

      for (let i = 0; i < inputValue.length; i++) {
        if (
          currentOriginalWord[i] === inputValue[i] &&
          currentOriginalWord[i] !== undefined
        ) {
          correctChars++;
        }
      }
    }

    const cpm =
      elapsedMinutes > 0 ? Math.round(correctChars / elapsedMinutes) : 0;
    const wpm =
      elapsedMinutes > 0 ? Math.round(correctWordsCount / elapsedMinutes) : 0;
    const accuracy =
      totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

    return {
      cpm,
      wpm,
      accuracy,
      totalCharacters: totalChars,
      correctCharacters: correctChars,
      totalWords: currentWordIndex,
      correctWords: correctWordsCount,
    };
  }, [startTime, currentWordIndex, typedWords, inputValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.nativeEvent.isComposing) {
        e.preventDefault();
        if (inputValue.trim()) {
          const currentTypedWord = inputValue.trim();
          setTypedWords((prev) => [...prev, currentTypedWord]);
          const nextIndex = currentWordIndex + 1;
          setCurrentWordIndex(Math.min(nextIndex, words.length - 1));
          setInputValue("");

          // 마지막 단어 완료 시 타이핑 완료 처리
          if (nextIndex >= words.length) {
            completeTyping();
          }
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
    [inputValue, currentWordIndex, typedWords, startTyping, completeTyping],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      console.log(typedWords.length);

      if (typedWords.length === 0) {
        startTyping();
      }

      setInputValue(value);

      if (value.endsWith(" ") && value.trim()) {
        const currentTypedWord = value.trim();
        setTypedWords((prev) => [...prev, currentTypedWord]);
        const nextIndex = currentWordIndex + 1;
        setCurrentWordIndex(Math.min(nextIndex, words.length - 1));
        setInputValue("");

        // 마지막 단어 완료 시 타이핑 완료 처리
        if (nextIndex >= words.length) {
          completeTyping();
        }
      }
    },
    [currentWordIndex, startTyping, completeTyping],
  );

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  // 현재 통계 계산
  const currentStats = calculateStats();

  return {
    inputValue,
    currentWordIndex,
    typedWords,
    isFocused,
    words,
    isStarted,
    isCompleted,
    currentStats,
    handleKeyDown,
    handleInputChange,
    handleFocus,
    handleBlur,
  };
};
