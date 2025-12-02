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
        if (direction === "L") {
            dialPosition = (dialPosition - distance) % 100;
        }
        if (direction === "R") {
            dialPosition = (dialPosition + distance) % 100;
        }

        if (dialPosition === 0) {
            safeCode++;
        }
    }
    console.log(safeCode);
}

await crackSafe();
