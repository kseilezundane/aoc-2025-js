"use strict";

import { readFile } from "../utils/read-file.js";

function getInvalidIds() {
    const idRanges = readFile("./input.txt").trim().split(",");

    let invalidIdSum = 0;

    for (const range of idRanges) {
        const [rangeStart, rangeEnd] = range.split("-").map(Number);
        for (let id = rangeStart; id <= rangeEnd; id++) {
            const stringifiedId = String(id);
            for (let digitIndex = 0; digitIndex < stringifiedId.length; digitIndex++) {
                const digitSequence = stringifiedId.slice(0, digitIndex);
                if (stringifiedId.replaceAll(digitSequence, "") === "") {
                    invalidIdSum += id;
                    break;
                }
            }
        }
    }

    console.log(invalidIdSum);
}

getInvalidIds();
