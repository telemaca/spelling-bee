import React, { useRef } from "react";
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

  const getPointsToNextLevel = () => {
    const current = thresholds.find((e) => e.rank === currentRank);
    if (!current) return null;
    const currentPosition = thresholds.indexOf(current);
    const minScoreNext = thresholds[currentPosition - 1].minScore;
    return minScoreNext - currentScore;
  };

  const getPointsText = () => {
    if (currentRank === "Genio/a") {
      <span className="text-xs">¡Alcanzaste el máximo nivel!</span>;
    }
    return (
      <span className="text-xs">
        Próximo nivel: {getPointsToNextLevel()}; Genio/a:{" "}
        {thresholds.find((e) => e.rank === "Genio/a")?.minScore}
      </span>
    );
  };

  const getCssClass = (isCurrent: boolean, isAchieved: boolean) => {
    if (isCurrent) return "font-bold text-black";
    return isAchieved ? "text-gray-500" : "text-gray-300";
  };

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
      <OverlayPanel className="w-9/10 custom-overlay-panel" ref={op}>
        <div>
          <h3 className="font-bold text-gray-200 text-lg">Niveles</h3>
          <p className="text-sm text-gray-200 mb-5">
            Los niveles se calculan en función de un porcentaje del total
            posible de puntos de cada cambinación de letras
          </p>
          <div className="custom-vertical-timeline">
            <div className="cell cell-heading text-gray-200 font-bold text-xs">
              <div className="left">Nivel</div>
              <div className="right">Puntos mínimos</div>
            </div>
          </div>
          <div className="custom-vertical-timeline ranks">
            {timelineData.map((rank, i) => (
              <div
                className={`cell ${rank.isCurrent ? "current-rank-event" : ""}`}
                key={i}
              >
                {rank.isCurrent && (
                  <div className="current-score--timeline">{currentScore}</div>
                )}
                <div className="left with-line">
                  <p className={getCssClass(rank.isCurrent, rank.achieved)}>
                    {rank.rank}
                  </p>
                  {rank.isCurrent && <span>{getPointsText()}</span>}
                </div>
                <div
                  className={`right ${getCssClass(
                    rank.isCurrent,
                    rank.achieved
                  )}`}
                >
                  {rank.minScore}
                </div>
              </div>
            ))}
          </div>
        </div>
      </OverlayPanel>
    </>
  );
}
