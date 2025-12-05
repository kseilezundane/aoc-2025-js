"use strict";

import { createReadlineInterface } from "../utils/read-file.js";

async function countFreshIngredients() {
    const readlineInterface = createReadlineInterface("input.txt");

    const idRanges = [];
    let freshIngredientsCount = 0;

    for await (const line of readlineInterface) {
        if (line.includes("-")) {
            idRanges.push(line.split("-").map(Number));
        } else if (line.length > 0) {
            let ingredientId = Number(line);
            for (const [rangeStart, rangeEnd] of idRanges) {
                if (ingredientId >= rangeStart && ingredientId <= rangeEnd) {
                    freshIngredientsCount++;
                    break;
                }
            }
        }
    }

    console.log(freshIngredientsCount);
}

await countFreshIngredients();
