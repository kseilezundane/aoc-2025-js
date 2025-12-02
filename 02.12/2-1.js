"use strict";

import { readFile } from "../utils/read-file.js";

function getInvalidIdsViaString() {
    const idRanges = readFile("./input.txt").trim().split(",");

    let invalidIdSum = 0;

    for (const range of idRanges) {
        const [rangeStart, rangeEnd] = range.split("-").map(Number);
        for (let id = rangeStart; id <= rangeEnd; id++) {
            const stringifiedId = String(id);
            if (stringifiedId.length % 2 !== 0) continue;
            // since number should contain a sequence repeated twice, sequence's length should be 1/2
            // of the string length
            const digitSequence = stringifiedId.slice(0, stringifiedId.length / 2);
            if (stringifiedId.replaceAll(digitSequence, "") === "") {
                invalidIdSum += id;
            }
        }
    }

    console.log(invalidIdSum);
}

function getInvalidIdsViaMath() {
    const idRanges = readFile("./input.txt").trim().split(",");

    let invalidIdSum = 0;

    for (const range of idRanges) {
        const [rangeStart, rangeEnd] = range.split("-").map(Number);
        for (let id = rangeStart; id <= rangeEnd; id++) {
            const numberLength = String(id).length;
            if (numberLength % 2 !== 0) continue;
            if (id % Math.pow(10, numberLength / 2) === Math.floor(id / Math.pow(10, numberLength / 2))) {
                invalidIdSum += id;
            }
        }
    }

    console.log(invalidIdSum);
}

getInvalidIdsViaString();
getInvalidIdsViaMath();
