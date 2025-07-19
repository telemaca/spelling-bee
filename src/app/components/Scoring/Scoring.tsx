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
    return reached.length > 0 ? reached[0].rank : "Principiante"; // el primero es el de más alto nivel
  }

  function getSpellingBeeRanks(totalPoints: number): RankThresholds[] {
    const ranks: [string, number][] = [
      ["Genio/a", 0.7],
      ["Espectacular", 0.5],
      ["Excelente", 0.4],
      ["Bárbaro", 0.25],
      ["Genial", 0.15],
      ["Bien", 0.08],
      ["Subiendo", 0.05],
      ["Comenzando", 0.02],
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
      <div className="flex">
        <div className="current-rank wave-text" key={currentRank}>
          {currentRank.split("").map((e, i) => (
            <span style={{ animationDelay: `${(i + 1) * 0.1}s` }} key={i}>
              {e}
            </span>
          ))}
        </div>
        <div
          className="custom-timeline"
          onClick={(e) => op?.current?.toggle(e)}
        >
          <div className="timeline-line"></div>
          {timelineDataCopy.reverse().map((item, i) => (
            <div
              key={i}
              className={`timeline-event event-number${i + 1} ${
                item.isCurrent && "current-event"
              } ${
                item.achieved
                  ? "bg-yellow-500 border-yellow-700"
                  : "bg-gray-400 border-gray-400"
              }`}
            >
              {item.isCurrent ? currentScore : ""}
            </div>
          ))}
        </div>
      </div>
      <OverlayPanel className="w-9/10" ref={op}>
        <Timeline
          value={timelineData}
          align="left"
          className="custom-timeline-vertical"
          // opposite={(item) => null}
          content={(item) =>
            item.isCurrent ? (
              <div className="p-2 flex justify-between bg-yellow-400 rounded-full">
                <strong className="text-black text-xs">{item.rank}</strong>
                <div className="text-xs text-gray-500">{item.minScore}</div>
              </div>
            ) : (
              <div className="flex justify-between">
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
                className={`w-3 h-3 rounded-full border-2 ml-[12px] ${
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
