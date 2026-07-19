// src/util/TextUtils.js
export function getFitFontSize(text, field) {
    let size = field.fontSize || 20;
    const width = field.width || 100;
    const height = field.height || 30;

    while (size > 8) {
        const charsPerLine = Math.floor(width / (size * 0.55));
        const lineCount = Math.ceil(text.length / charsPerLine);
        const totalHeight = lineCount * size * 1.2;

        if (totalHeight <= height) break;
        size--;
    }
    return size;
}
