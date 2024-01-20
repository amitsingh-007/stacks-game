import GameState from "@/enums/GameState";
import { TLevel } from "@/types/levelConfig";
import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

const LEVELS: Array<{ label: string; value: TLevel }> = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
  { label: "Expert", value: "expert" },
];

interface Props {
  level: TLevel;
  setLevel: Dispatch<SetStateAction<TLevel>>;
  gameState: GameState;
}

const LevelSelector = ({ level, setLevel, gameState }: Props) => {
  const getLevelColor = () => {
    switch (level) {
      case "easy":
        return "success";
      case "medium":
        return "primary";
      case "hard":
        return "danger";
      case "expert":
        return "secondary";
      default:
        return undefined;
    }
  };

  return (
    <Select
      color={getLevelColor()}
      label="Difficulty"
      defaultSelectedKeys={[level]}
      disabledKeys={[level]}
      isDisabled={gameState === GameState.Playing}
      size="sm"
      className="max-w-36"
      onSelectionChange={(valueSet) => setLevel([...valueSet][0] as TLevel)}
    >
      {LEVELS.map((level) => (
        <SelectItem key={level.value} value={level.value}>
          {level.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default LevelSelector;
