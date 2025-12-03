"use strict";

import { createReadlineInterface } from "../utils/read-file.js";

async function findTotalOutputJoltage() {
    const readlineInterface = createReadlineInterface("input.txt");

    let totalOutputJoltage = 0;
    const batteriesAmount = 12;

    for await (const line of readlineInterface) {
        const currentMaximumJoltage = new Array(batteriesAmount).fill("0");
        let nextBatteryIndex = 0;
        // iterating through array where we store current maximum joltage
        for (let i = 0; i < currentMaximumJoltage.length; i++) {
            for (let j = nextBatteryIndex; j < line.length; j++) {
                // abusing JS - stringified digit comparisons work as expected
                // also checking that we have enough batteries further in the line
                // to proceed
                if (line[j] > currentMaximumJoltage[i] && line.length - j >= batteriesAmount - i)
                {
                    currentMaximumJoltage[i] = line[j];
                    // setting next battery index so the next biggest battery is always after the previous
                    // biggest one
                    nextBatteryIndex = j + 1;
                }
            }
        }
        totalOutputJoltage += Number(currentMaximumJoltage.join(""));
    }
    console.log(totalOutputJoltage);
}

await findTotalOutputJoltage();
