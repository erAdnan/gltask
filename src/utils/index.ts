export const getRandomColor = () => 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

export interface PlayerTypes {
    name: string;
    currentScore: number;
    hisTurn: boolean;
    previousDiceScore: number;
    hasToSkip: boolean;
}
export const generatePlayers = (counts: string): PlayerTypes[] => {
    let players = [];

    for(let i = 0; i < parseInt(counts); i ++) {
        const playerObj: PlayerTypes = {
            name: `Player ${i + 1}`,
            currentScore: 0,
            hisTurn: false,
            previousDiceScore: -1,
            hasToSkip: false
        }
        players.push(playerObj);
    }

    return players;
};

export const getRandomPlayerIndex = (max: number, min = 0): number => {
    return Math.floor(Math.random() * (max - min) + min);
}