import Row from "@/helpers/Row";
import React from "react";
import { CONFIG } from "../constants";
import Dot from "./Dot";

interface Props {
  rows: Row[];
}

const Board = ({ rows }: Props) => {
  const dotRows = [];

  for (let i = 0; i < CONFIG.Rows; i++) {
    const dotColumn = [];
    const row = rows[i];

    for (let j = 0; j < CONFIG.Columns; j++) {
      dotColumn.push(
        <React.Fragment key={`cell-${i}:${j}`}>
          <Dot isOn={row.isOn(j)} />
        </React.Fragment>
      );
    }

    dotRows.push(<React.Fragment key={`row-${i}`}>{dotColumn}</React.Fragment>);
  }

  return (
    <div
      className="p-5 rounded-xl border-zinc-900 border-2 grid gap-[4px] md:gap-[6px]"
      style={{
        gridTemplateRows: `repeat(${CONFIG.Rows}, 1fr)`,
        gridTemplateColumns: `repeat(${CONFIG.Columns}, 1fr)`,
      }}
    >
      {dotRows}
    </div>
  );
};

export default Board;
