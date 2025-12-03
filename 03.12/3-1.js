"use strict";

import { createReadlineInterface } from "../utils/read-file.js";

async function findTotalOutputJoltage() {
    const readlineInterface = createReadlineInterface("input.txt");

    let totalOutputJoltage = 0;
    const batteriesAmount = 2;

    for await (const line of readlineInterface) {
        const currentMaximumJoltage = new Array(batteriesAmount).fill("0");
        // going through all the batteries, if they are bigger than the current maximum
        // we've found the maximum first battery
        for (let i = 0; i < line.length - 1; i++) {
            // abusing JS - stringified digit comparisons work as expected
            if (line[i] > currentMaximumJoltage[0]) {
                currentMaximumJoltage[0] = line[i];
                // resetting the second battery value as soon as we've found bigger first battery
                currentMaximumJoltage[1] = 0;
                // looking for the second battery only after the first one
                for (let j = i + 1; j < line.length; j++) {
                    if (line[j] > currentMaximumJoltage[1]) {
                        currentMaximumJoltage[1] = line[j];
                    }
                }
            }
        }
        totalOutputJoltage += Number(currentMaximumJoltage.join(""));
    }
    console.log(totalOutputJoltage);
}

await findTotalOutputJoltage();
