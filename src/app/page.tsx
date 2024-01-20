"use client";

import { useDeviceDetect } from "@/providers/DeviceDetectProvider";
import { getTitle } from "@/utils";
import { useKeyPressEvent } from "react-use";
import Board from "../components/Board";
import useGameModel from "../hooks/useGameModel";
import LevelSelector from "@/components/LevelSelector";

export default function Home() {
  const isMobile = useDeviceDetect();
  const { gameScore, state, action, gameLevel, setGameLevel } = useGameModel();

  useKeyPressEvent(" ", action);

  return (
    <div
      onClick={isMobile ? action : undefined}
      className="flex flex-col items-center h-full"
    >
      <h1 className="text-3xl md:text-5xl font-semibold mt-5 mb-8 md:mb-20 text-center">
        {getTitle(state.gameStatus)}
        <div className="opacity-90 text-base md:text-lg italic font-normal">
          {isMobile ? "(Touch to play)" : "(Press SPACEBAR to play)"}
        </div>
      </h1>
      <div className="flex items-center justify-between w-80 md:w-96 mb-6 md:mb-10">
        <div className="text-2xl font-medium">
          Score:
          <span className="font-semibold text-amber-400 [text-shadow:_0_4px_4px_var(--tw-shadow-color)] shadow-amber-500 ml-1">
            {gameScore}
          </span>
        </div>
        <LevelSelector
          level={gameLevel}
          setLevel={setGameLevel}
          gameState={state.gameStatus}
        />
      </div>
      <Board rows={state.rows} />
    </div>
  );
}
