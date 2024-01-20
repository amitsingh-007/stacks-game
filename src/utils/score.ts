import { CONFIG } from "@/constants";
import { IGameState } from "@/hooks/useGameState";

const LEVEL_SCORE_BOOSTER = 2;

export const computeGameScore = (state: IGameState) => {
  let score = 0;
  for (let i = state.activeRow + 1; i < CONFIG.Rows; i++) {
    const bottomIndexedRowNo = CONFIG.Rows - i - 1;
    const levelBasedScore = bottomIndexedRowNo * LEVEL_SCORE_BOOSTER;
    const activeRowBasedScore = state.rows[i].length;
    score += levelBasedScore + activeRowBasedScore;
  }
  return score;
};
