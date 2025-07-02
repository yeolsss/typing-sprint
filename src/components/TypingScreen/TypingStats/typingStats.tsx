import React from "react";

interface TypingStatsProps {
  cpm: number;
  wpm: number;
  accuracy: number;
  isCompleted: boolean;
}

const TypingStats: React.FC<TypingStatsProps> = ({
  cpm,
  wpm,
  accuracy,
  isCompleted,
}) => {
  return (
    <div
      className={`p-4 ${isCompleted ? "border-green-200 bg-green-50" : "bg-gray-50"} rounded-lg border`}
    >
      <h3 className="mb-3 text-lg font-semibold">
        {isCompleted ? "최종 결과" : "실시간 통계"}
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{cpm}</div>
          <div className="text-sm text-gray-600">CPM</div>
          <div className="text-xs text-gray-500">타/분</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{wpm}</div>
          <div className="text-sm text-gray-600">WPM</div>
          <div className="text-xs text-gray-500">단어/분</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{accuracy}%</div>
          <div className="text-sm text-gray-600">정확도</div>
          <div className="text-xs text-gray-500">Accuracy</div>
        </div>
      </div>
      {isCompleted && (
        <div className="mt-4 text-center">
          <p className="font-semibold text-green-600">
            타이핑 완료! 수고하셨습니다 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default TypingStats;
