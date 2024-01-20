import { CONFIG } from "@/constants";
import GameState from "@/enums/GameState";
import Row from "@/helpers/Row";
import { ILevelConfig } from "@/types/levelConfig";
import { useCallback, useMemo, useState } from "react";

export interface IGameState {
  rows: Row[];
  activeRow: number;
  gameStatus: GameState;
}

const replaceRow = (rows: Row[], i: number, row: Row) => {
  return [...rows.slice(0, i), row, ...rows.slice(i + 1, rows.length)];
};

const useGameState = (levelConfig: ILevelConfig) => {
  const defaultState = useMemo(() => {
    const initialRows = [];
    for (let i = 0; i < CONFIG.Rows; i++) {
      if (i === CONFIG.Rows - 1) {
        initialRows.push(new Row(0, levelConfig.startingLength));
      } else {
        initialRows.push(new Row(0, -1));
      }
    }
    return {
      rows: initialRows,
      activeRow: CONFIG.Rows - 1,
      gameStatus: GameState.Playing,
    };
  }, [levelConfig.startingLength]);

  const [state, setState] = useState<IGameState>(defaultState);

  const addRow = useCallback(() => {
    setState((prevState) => {
      const newActiveRowIndex = prevState.activeRow - 1;
      const currentActiveRow = prevState.rows[prevState.activeRow];
      const isFirstRow = prevState.activeRow === prevState.rows.length - 1;
      let updatedActiveRow: Row;
      if (isFirstRow) {
        updatedActiveRow = currentActiveRow;
      } else {
        const previousRow = prevState.rows[prevState.activeRow + 1];
        const intersection = previousRow.getIntersection(currentActiveRow);
        updatedActiveRow = currentActiveRow.setLeftRight(
          intersection.left,
          intersection.right
        );
      }
      const updatedRows = replaceRow(
        prevState.rows,
        prevState.activeRow,
        updatedActiveRow
      );
      if (updatedActiveRow.length < 0) {
        return {
          ...prevState,
          gameStatus: GameState.Lost,
        };
      }
      if (newActiveRowIndex < 0) {
        return {
          ...prevState,
          rows: updatedRows,
          gameStatus: GameState.Won,
        };
      }
      const nextActiveRow = prevState.rows[newActiveRowIndex];
      return {
        ...prevState,
        activeRow: newActiveRowIndex,
        rows: replaceRow(
          updatedRows,
          newActiveRowIndex,
          nextActiveRow
            .setLength(updatedActiveRow.length)
            .setLeft(updatedActiveRow.left)
        ),
      };
    });
  }, []);

  const setRowPosition = useCallback((start: number) => {
    setState((prevState) => {
      const activeRow = prevState.rows[prevState.activeRow];
      if (prevState.gameStatus !== GameState.Playing) {
        return prevState;
      }
      return {
        ...prevState,
        rows: replaceRow(
          prevState.rows,
          prevState.activeRow,
          activeRow.setLeft(start)
        ),
      };
    });
  }, []);

  const restartGame = useCallback(() => {
    setState({ ...defaultState });
  }, [defaultState]);

  return {
    state,
    addRow,
    setRowPosition,
    restartGame,
  };
};

export default useGameState;
