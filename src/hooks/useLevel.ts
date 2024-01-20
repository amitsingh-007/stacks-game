import { ILevelConfig, TLevel } from "@/types/levelConfig";
import { useMemo, useState } from "react";

const useLevel = () => {
  const [gameLevel, setGameLevel] = useState<TLevel>("medium");

  const levelConfig: ILevelConfig = useMemo(() => {
    switch (gameLevel) {
      case "easy":
        return {
          msPerIteration: 1400,
          startingLength: 6,
        };
      case "hard":
        return {
          msPerIteration: 800,
          startingLength: 5,
        };
      case "expert":
        return {
          msPerIteration: 800,
          startingLength: 4,
        };
      case "medium":
      default:
        return {
          msPerIteration: 1000,
          startingLength: 5,
        };
    }
  }, [gameLevel]);

  return {
    gameLevel,
    setGameLevel,
    levelConfig,
  };
};

export default useLevel;
