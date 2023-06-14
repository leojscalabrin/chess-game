import {
  PieceType,
  TeamType,
  Piece,
} from "../components/Chessboard/Chessboard";

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {

    const piece = boardState.find((p) => p.x === x && p.y === y);
    if (piece) {
        return true;
    } else {
        return false;
    }
  }

  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    // lógica para o peão
    if (type === PieceType.PAWN) {
      if (team === TeamType.OUR) {
        // checando se é o primeiro movimento
        if (py === 1) {
          if (px === x && (y - py === 1 || y - py === 2)) {
            if (!this.tileIsOccupied(x, y, boardState)) {
                return true;
            }
          }
        } else {
          // movimento comum
          if (px === x && y - py === 1) {
            if (!this.tileIsOccupied(x, y, boardState)) {
                return true;
            } 
          }
        }
        // movimento do peão preto
      } else {
        if (py === 6) {
          if (px === x && (y - py === -1 || y - py === -2)) {
            return true;
          }
        } else {
          if (px === x && y - py === -1) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
