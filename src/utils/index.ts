import GameState from "@/enums/GameState";

export const getTitle = (gameStatus: GameState) => {
  switch (gameStatus) {
    case GameState.Won:
      return "Congratulations, you won! 🎊";
    case GameState.Lost:
      return "You lost, please try again! 👾";
    case GameState.Playing:
    default:
      return "Hello, welcome to the Stacks! 👋";
  }
};
