import {createReadlineInterface} from "../utils/read-file.js";

const neighbouringPositions = [
    [-1,-1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
];

async function findAccessiblePaperRolls() {
    const readlineInterface = createReadlineInterface("input.txt");

    const paperGrid = [];
    for await (const line of readlineInterface) {
        paperGrid.push(line.split(""));
    }

    let accessiblePaperRolls = 0;
    for (let i = 0; i < paperGrid.length; i++) {
        for (let j = 0; j < paperGrid[i].length; j++) {
            if (paperGrid[i][j] === "@") {
                let neighbouringRollCount = 0;
                neighbouringPositions.forEach(position => {
                    if (paperGrid[i + position[0]] && paperGrid[i + position[0]][j + position[1]] === "@") {
                        neighbouringRollCount++;
                    }
                });
                if (neighbouringRollCount < 4) {
                    accessiblePaperRolls++;
                }
            }
        }
    }
    console.log(accessiblePaperRolls);
}

await findAccessiblePaperRolls();
