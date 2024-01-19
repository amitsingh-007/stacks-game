import useGameModelStore from "@/store/gameModel";
import React, { useEffect, useRef, useState } from "react";
import { CONFIG } from "../constants";
import GameState from "../enums/GameState";
import FrameRunner from "../helpers/FrameRunner";
import { useLatest } from "react-use";
import { computeGameScore } from "@/utils/score";

const useGameModel = () => {
  const frameRunnerRef = useRef(new FrameRunner());
  const { state, addRow, setRowPosition, restartGame } = useGameModelStore(
    (state) => state
  );
  const stateRef = useLatest(state);
  const [gameScore, setGameScore] = useState(0);

  useEffect(() => {
    setGameScore(computeGameScore(stateRef.current));
  }, [state.activeRow, stateRef]);

  useEffect(() => {
    const handleFrame = (
      _frameCount: number,
      _frameLength: number,
      totalDuration: number
    ) => {
      const activeRow = state.rows[state.activeRow];
      const ms = totalDuration % CONFIG.MillisecondsPerIteration;
      const uniquePosition = CONFIG.Columns - activeRow.length;
      const totalPositions = uniquePosition * 2;
      const msPerPosition = CONFIG.MillisecondsPerIteration / totalPositions;
      const currentPosition = Math.floor(ms / msPerPosition);
      const newStart =
        currentPosition > uniquePosition
          ? totalPositions - currentPosition
          : currentPosition;
      setRowPosition(newStart);
    };

    frameRunnerRef.current.replaceOnFrame(handleFrame);
  }, [setRowPosition, state.activeRow, state.rows]);

  useEffect(() => {
    const frameRunner = frameRunnerRef.current;
    frameRunner.start();
    return () => {
      frameRunner.reset();
    };
  }, []);

  useEffect(() => {
    if (state.gameStatus === GameState.Lost) {
      frameRunnerRef.current.stop();
    } else if (state.gameStatus === GameState.Won) {
      frameRunnerRef.current.stop();
    }
  }, [state.gameStatus]);

  const action = React.useCallback(() => {
    if (state.gameStatus === GameState.Lost) {
      restartGame();
      frameRunnerRef.current.start();
    } else if (state.gameStatus === GameState.Playing) {
      addRow();
    }
  }, [addRow, restartGame, state.gameStatus]);

  return { gameScore, state, action };
};

export default useGameModel;
