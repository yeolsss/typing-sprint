"use client";
import React, { PropsWithChildren } from "react";

const word =
  "굳이 내가 이탈리아어를 배워야 할 필요는 없었다. 이탈리아에 살지 않았고 이탈리아 친구도 없었다. 난 이탈리아어를 갈망 했을 뿐이다. 하지만 결국 갈망은 미친 듯 원하는 욕망과 다르지 않다. 많은 열정적인 관계가 그렇듯 이탈리아어에 대한 내 열광은 애착, 집착이 될 터였다. 이성을 잃는, 응답받지 못하는 원가가 늘 존재하겠지. 난 이탈리아어와 사랑에 빠졌지만 내가 사랑하는 대상은 내게 무관심하다. 이탈리아어는 날 절대 갈망하지 않을 거였다.";
const splitWord = word.split(" ");

const TypingScreen = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative w-full">
      <div className="text-exact-color mx-auto flex h-auto w-[60%] min-w-80 flex-wrap border border-gray-200 p-2 text-2xl font-bold whitespace-pre-wrap select-none">
        {splitWord.map((word, idx) => (
          <span key={idx}>
            {word}
            {idx < splitWord.length - 1 && " "}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TypingScreen;
