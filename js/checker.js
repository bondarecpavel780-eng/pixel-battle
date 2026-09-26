export function checkAccuracy(refCtx, userCtx, scoreDisplay) {
    const original = refCtx.getImageData(0, 0, 64, 64).data;
    const user = userCtx.getImageData(0, 0, 64, 64).data;
    
    let matches = 0;
    const totalPixels = 64 * 64; // Рахуємо всі 4096 пікселів
    
    for (let i = 0; i < original.length; i += 4) {
        let oR = original[i];
        let oG = original[i+1];
        let oB = original[i+2];
        let oA = original[i+3];
        
        let uR = user[i];
        let uG = user[i+1];
        let uB = user[i+2];
        let uA = user[i+3];
        
        // Якщо піксель еталону прозорий (фон), вважаємо його білим
        if (oA === 0) {
            oR = 255; oG = 255; oB = 255; oA = 255;
        }
        
        // Якщо піксель користувача прозорий (не замальований), теж автоматично вважаємо його білим
        if (uA === 0) {
            uR = 255; uG = 255; uB = 255; uA = 255;
        }
        
        // Якщо кольори збігаються, зараховуємо правильну клітинку
        if (oR === uR && oG === uG && oB === uB && oA === uA) {
            matches++;
        }
    }
    
    // Вираховуємо відсоток від загальної кількості пікселів
    const accuracy = ((matches / totalPixels) * 100).toFixed(1);
    scoreDisplay.textContent = `${accuracy}%`;
}