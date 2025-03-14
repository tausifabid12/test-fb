"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomItem = getRandomItem;
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
