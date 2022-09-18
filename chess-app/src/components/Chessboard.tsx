import React from "react";

import "./Chessboard.css";

const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function Chessboard() {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      board.push(
        <div className="tile">
          {horizontalAxis[i]} {verticalAxis[j]}
        </div>
      );
    }
  }
  return <div id="chessboard">{board}</div>;
}
