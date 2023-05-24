import { PieceType, TeamType } from "../components/Chessboard/Chessboard";

export default class Referee {
    isValidMove(px:number, py:number, x:number, y:number, type:PieceType, team: TeamType) {

        if(type === PieceType.PAWN) {
            if(team === TeamType.OUR) {
                if (py === 1) {
                    if(px === x && (y - py === 1 || y - py === 2)) {
                        console.log("Movimento válido")
                        return true;
                    }
                }
            }
        }

        return true;
    }
}