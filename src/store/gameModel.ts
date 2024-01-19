import { CONFIG } from "@/constants";
import GameState from "@/enums/GameState";
import Row from "@/helpers/Row";
import { create } from "zustand";

export interface IGameState {
  rows: Row[];
  activeRow: number;
  gameStatus: GameState;
}

interface State {
  state: IGameState;
  addRow: () => void;
  setRowPosition: (start: number) => void;
  restartGame: () => void;
}

const initialRows = [];
for (let i = 0; i < CONFIG.Rows; i++) {
  if (i === CONFIG.Rows - 1) {
    initialRows.push(new Row(0, CONFIG.StartingLength));
  } else {
    initialRows.push(new Row(0, -1));
  }
}

const defaultState = {
  rows: initialRows,
  activeRow: CONFIG.Rows - 1,
  gameStatus: GameState.Playing,
};

const replaceRow = (rows: Row[], i: number, row: Row) => {
  return [...rows.slice(0, i), row, ...rows.slice(i + 1, rows.length)];
};

const useGameModelStore = create<State>()((set) => ({
  state: defaultState,

  addRow: () => {
    set(({ state }) => {
      const newActiveRowIndex = state.activeRow - 1;
      const currentActiveRow = state.rows[state.activeRow];
      const isFirstRow = state.activeRow === state.rows.length - 1;
      let updatedActiveRow: Row;
      if (isFirstRow) {
        updatedActiveRow = currentActiveRow;
      } else {
        const previousRow = state.rows[state.activeRow + 1];
        const intersection = previousRow.getIntersection(currentActiveRow);
        updatedActiveRow = currentActiveRow.setLeftRight(
          intersection.left,
          intersection.right
        );
      }
      const updatedRows = replaceRow(
        state.rows,
        state.activeRow,
        updatedActiveRow
      );
      if (updatedActiveRow.length < 0) {
        return {
          state: {
            ...state,
            gameStatus: GameState.Lost,
          },
        };
      }
      if (newActiveRowIndex < 0) {
        return {
          state: {
            ...state,
            rows: updatedRows,
            gameStatus: GameState.Won,
          },
        };
      }
      const nextActiveRow = state.rows[newActiveRowIndex];
      return {
        state: {
          ...state,
          activeRow: newActiveRowIndex,
          rows: replaceRow(
            updatedRows,
            newActiveRowIndex,
            nextActiveRow
              .setLength(updatedActiveRow.length)
              .setLeft(updatedActiveRow.left)
          ),
        },
      };
    });
  },
  setRowPosition: (start: number) => {
    set(({ state }) => {
      const activeRow = state.rows[state.activeRow];
      if (state.gameStatus !== GameState.Playing) {
        return { state };
      }
      return {
        state: {
          ...state,
          rows: replaceRow(
            state.rows,
            state.activeRow,
            activeRow.setLeft(start)
          ),
        },
      };
    });
  },
  restartGame: () => {
    set({ state: { ...defaultState } });
  },
}));

export default useGameModelStore;
