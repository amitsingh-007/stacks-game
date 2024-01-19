"use client";

import { getTitle } from "@/utils";
import { useKeyPressEvent } from "react-use";
import Board from "../components/Board";
import useGameModel from "../hooks/useGameModel";
import { useDeviceDetect } from "@/providers/DeviceDetectProvider";
import { CONFIG } from "@/constants";
import { Chip } from "@nextui-org/react";

export default function Home() {
  const isMobile = useDeviceDetect();
  const { gameScore, state, action } = useGameModel();

  useKeyPressEvent(" ", action);

  return (
    <div
      onClick={isMobile ? action : undefined}
      className="flex flex-col items-center h-full"
    >
      <h1 className="text-3xl md:text-5xl font-semibold mt-5 mb-20 text-center">
        {getTitle(state.gameStatus)}
        <div className="opacity-90 text-base md:text-lg italic font-normal">
          {isMobile ? "(Touch to play)" : "(Press SPACEBAR to play)"}
        </div>
      </h1>
      <div className="text-2xl font-medium mb-10">
        Score:
        <span className="font-semibold text-amber-400 [text-shadow:_0_4px_4px_var(--tw-shadow-color)] shadow-amber-500 ml-1">
          {gameScore}
        </span>
      </div>
      <Board rows={state.rows} />
    </div>
  );
}
