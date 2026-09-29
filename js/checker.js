export function checkAccuracy(refCtx, userCtx, scoreDisplay) {
    const original = refCtx.getImageData(0, 0, 64, 64).data;
    const user = userCtx.getImageData(0, 0, 64, 64).data;

    let matches = 0;
    let totalSignificantPixels = 0; // Рахуємо тільки ті пікселі, які не є білими

    for (let i = 0; i < original.length; i += 4) {
        let oR = original[i];
        let oG = original[i + 1];
        let oB = original[i + 2];
        let oA = original[i + 3];

        let uR = user[i];
        let uG = user[i + 1];
        let uB = user[i + 2];
        let uA = user[i + 3];

        // Якщо піксель еталону прозорий (фон), вважаємо його білим
        if (oA === 0) {
            oR = 255; oG = 255; oB = 255; oA = 255;
        }

        // Якщо піксель користувача прозорий (не замальований), теж автоматично вважаємо його білим
        if (uA === 0) {
            uR = 255; uG = 255; uB = 255; uA = 255;
        }

        // Перевіряємо, чи є піксель еталону білим (включаючи ті, що стали білими через прозорість)
        const isWhite = (oR === 255 && oG === 255 && oB === 255);
        if (!isWhite) {
            totalSignificantPixels++;

            // Якщо кольори збігаються, зараховуємо правильну клітинку
            if (oR === uR && oG === uG && oB === uB && oA === uA) {
                matches++;
            }
        }
    }

    // Захист від ділення на нуль (якщо раптом картинка повністю порожня або біла)
    let accuracy = 0;
    if (totalSignificantPixels > 0) {
        accuracy = (matches / totalSignificantPixels) * 100;
    } else {
        accuracy = 100;
    }

    // Виводимо фінальний відсоток на екран
    scoreDisplay.textContent = `${accuracy.toFixed(1)}%`;
}