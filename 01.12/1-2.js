"use strict";

import { createReadlineInterface } from "../utils/read-file.js";

async function crackSafe() {
    const readlineInterface = createReadlineInterface("input.txt");

    let dialPosition = 50;
    let safeCode = 0;

    for await (const line of readlineInterface) {
        const direction = line[0];
        const distance = Number(line.match(/\d+/g));

        // 0-99 = 100 ticks for a full rotation
        const partialRotation = distance % 100;

        const fullRotations = Math.floor(distance / 100);
        safeCode += fullRotations;

        if (direction === "L") {
            const leftRotation = dialPosition - partialRotation;
            if (leftRotation >= 0) {
                dialPosition = leftRotation;
            } else {
                if (dialPosition !== 0) {
                    safeCode++;
                }
                dialPosition = 100 + leftRotation;
            }
        } else {
            const rightRotation = dialPosition + partialRotation;
            if (rightRotation <= 99) {
                dialPosition = rightRotation;
            } else {
                dialPosition = rightRotation - 100;
                if (dialPosition !== 0) {
                    safeCode++;
                }
            }
        }

        if (dialPosition === 0) {
            safeCode++;
        }
    }
    console.log(safeCode);
}

await crackSafe();
