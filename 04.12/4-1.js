import {createReadlineInterface} from "../utils/read-file.js";

const neighbouringPositions = [
    { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 },
    { x: 0, y: -1 }, { x: 0, y: 1 },
    { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }
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
                neighbouringPositions.forEach(({ x, y }) => {
                    if (paperGrid[i + x] && paperGrid[i + x][j + y] === "@") {
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
