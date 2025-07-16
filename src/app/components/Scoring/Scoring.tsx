import React, { useRef } from "react";
import { Timeline } from "primereact/timeline";
import { OverlayPanel } from "primereact/overlaypanel";

type RankThresholds = {
  rank: string;
  minScore: number;
};

type Props = {
  totalPoints: number;
  currentScore: number;
};

export default function RankTimeline({ totalPoints, currentScore }: Props) {
  function getCurrentRank(
    thresholds: RankThresholds[],
    currentScore: number
  ): string {
    const reached = thresholds.filter((r) => currentScore >= r.minScore);
    return reached.length > 0 ? reached[0].rank : "Beginner"; // el primero es el de más alto nivel
  }

  function getSpellingBeeRanks(totalPoints: number): RankThresholds[] {
    const ranks: [string, number][] = [
      ["Genio/a", 0.7],
      ["Espectacular", 0.5],
      ["Excelente", 0.4],
      ["Genial", 0.25],
      ["Muy bien", 0.15],
      ["Bien", 0.08],
      ["Subiendo", 0.05],
      ["Buen comienzo", 0.02],
      ["Principiante", 0],
    ];

    return ranks.map(([rank, percentage]) => ({
      rank,
      minScore: Math.floor(totalPoints * percentage),
    }));
  }

  const thresholds = getSpellingBeeRanks(totalPoints);
  const currentRank = getCurrentRank(thresholds, currentScore);

  const timelineData = thresholds.map((item) => ({
    ...item,
    achieved: currentScore >= item.minScore,
    isCurrent: item.rank === currentRank,
  }));

  const op = useRef<OverlayPanel>(null);

  const timelineDataCopy = [...timelineData];

  return (
    <>
      <Timeline
        value={timelineDataCopy.reverse()}
        layout="horizontal"
        onClick={(e) => op?.current?.toggle(e)}
        marker={(item) =>
          item.isCurrent ? (
            <div className="w-[60px] h-[30px] flex items-center justify-center rounded-full bg-yellow-400 text-black border-1 border-yellow-600 text-sm">
              {currentScore}
            </div>
          ) : (
            <div
              className={`w-3 h-3 rounded-full border-1 ${
                item.achieved
                  ? "bg-yellow-500 border-yellow-700"
                  : "bg-gray-300 border-gray-400"
              }`}
            />
          )
        }
      />
      <OverlayPanel className="w-9/10" ref={op}>
        <Timeline
          value={timelineData}
          align="left"
          className="custom-timeline"
          // opposite={(item) => null}
          content={(item) =>
            item.isCurrent ? (
              <div className="p-2 flex justify-between bg-yellow-400 rounded-full">
                <strong className="text-black text-xs">{item.rank}</strong>
                <div className="text-xs text-gray-500">{item.minScore}</div>
              </div>
            ) : (
              <div className="p-2 flex justify-between">
                <strong className="text-xs">{item.rank}</strong>
                <div className="text-xs text-gray-500">{item.minScore}</div>
              </div>
            )
          }
          marker={(item) =>
            item.isCurrent ? (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-black border-4 border-yellow-600 font-bold text-sm">
                {currentScore}
              </div>
            ) : (
              <div
                className={`w-3 h-3 rounded-full border-2 ${
                  item.achieved
                    ? "bg-yellow-500 border-yellow-700"
                    : "bg-gray-300 border-gray-400"
                }`}
              />
            )
          }
        />
      </OverlayPanel>
    </>
  );
}
