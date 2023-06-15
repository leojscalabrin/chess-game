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

  tileIsOccupiedByOpponent(x: number, y: number, boardState: Piece[], team: TeamType): boolean{
    const piece = boardState.find((p) => p.x === x && p.y === y && p.team !== team);

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
    if (type === PieceType.PAWN) {
      const specialRow = team === TeamType.OUR ? 1 : 6;
      const pawnDirection = team === TeamType.OUR ? 1 : -1;
      //lógica do movimento
      if(px === x && py === specialRow && y - py === 2*pawnDirection) {
        if (
            !this.tileIsOccupied(x, y, boardState) &&
            !this.tileIsOccupied(x, y - pawnDirection, boardState)
          ) {
            return true;
          }
      } else if (px === x && y - py === pawnDirection ) {
        if (!this.tileIsOccupied(x, y, boardState)) {
            return true;
          }
      }
      //lógica do ataque
      else if(x - py === -1 && y - py === pawnDirection) {
        //ataque canto superior ou inferior esquerdo
        if(this.tileIsOccupiedByOpponent(x, y, boardState, team)){
          return true;
        }
      } else if(x - px === 1 && y - py === pawnDirection) {
        //ataque canta superior ou inferior direito
        if(this.tileIsOccupiedByOpponent(x, y, boardState, team)){
          return true;
        }
      }
    }

    return false;
  }
}
