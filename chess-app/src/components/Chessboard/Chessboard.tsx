import { useEffect, useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";

const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
interface Piece {
  image: string;
  x: number;
  y: number;
}

const initialBoardState: Piece[] = [];

// estado inicial das peças
for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "b" : "w";
  const y = p === 0 ? 7 : 0;

  initialBoardState.push({ image: `assets/images/rook_${type}.png`, x: 0, y });
  initialBoardState.push({ image: `assets/images/rook_${type}.png`, x: 7, y });
  initialBoardState.push({ image: `assets/images/knight_${type}.png`, x: 1, y });
  initialBoardState.push({ image: `assets/images/knight_${type}.png`, x: 6, y });
  initialBoardState.push({ image: `assets/images/bishop_${type}.png`, x: 2, y });
  initialBoardState.push({ image: `assets/images/bishop_${type}.png`, x: 5, y });
  initialBoardState.push({ image: `assets/images/queen_${type}.png`, x: 3, y });
  initialBoardState.push({ image: `assets/images/king_${type}.png`, x: 4, y });
}
// peões pretos
for (let i = 0; i < 8; i++) {
  initialBoardState.push({ image: "assets/images/pawn_b.png", x: i, y: 6 });
}
// peões brancos
for (let i = 0; i < 8; i++) {
  initialBoardState.push({ image: "assets/images/pawn_w.png", x: i, y: 1 });
}

// criando as áreas do tabuleiro
export default function Chessboard() {
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const chessboardRef = useRef<HTMLDivElement>(null);

  // função para agarrar a peça do tabuleiro
  let activePiece: HTMLElement | null = null;

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const chessboard = chessboardRef.current;
    if (element.classList.contains("chess-piece") && chessboard) {
      const gridX = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const gridY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));
      setGridX(gridX);
      setGridY(gridY);
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      activePiece = element;
    }
  }
  // função para mover a peça agarrada
  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 25;
      const minY = chessboard.offsetTop - 25;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";
      // se o x é menor que o mínimo
      if (x < minX) {
        activePiece.style.left = `${minX}px`;
        // se o x é maior que o máximo
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
        // se o x está dentro das restrições
      } else {
        activePiece.style.left = `${x}px`;
      }
      // se o y é menor que o mínimo
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
        // se o y é maior que o máximo
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
        // se o y está dentro das restrições
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }
  //função para soltar a peça agarrada
  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
      const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));

      setPieces(value => {
        const pieces = value.map(p => {
          if(p.x === gridX && p.y === gridY) {
            p.x = x;
            p.y = y;
          }
          return p;
        })
        return pieces;
      })
      activePiece = null;
    }
  }

  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image = "";

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile key={`${j}, ${i}`} image={image} number={number} />);
    }
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={chessboardRef}
    >
      {board}
    </div>
  );
}
