import { PieceType, TeamType } from "../components/Chessboard/Chessboard";

export default class Referee {
    isValidMove(px:number, py:number, x:number, y:number, type:PieceType, team: TeamType) {
        // lógica para o peão
        if(type === PieceType.PAWN) {
            if(team === TeamType.OUR) {
                // checando se é o primeiro movimento
                if (py === 1) {
                    if(px === x && (y - py === 1 || y - py === 2)) {
                        console.log("Movimento válido")
                        return true;
                    }
                }
            } else {
                // movimento comum
                if(px === x && y - py === 1) {
                    return true;
                }
            }
        }

        return false;
    }
}