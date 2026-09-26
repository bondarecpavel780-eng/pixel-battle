export function generatePalette(refCtx, container, state) {
    const imageData = refCtx.getImageData(0, 0, 64, 64).data;
    const uniqueColors = []; 
    container.innerHTML = '';

    for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i], g = imageData[i + 1], b = imageData[i + 2], a = imageData[i + 3];
        
        if (a > 0) {
            // Перевіряємо, чи є вже схожий відтінок у палітрі (похибка 25 одиниць)
            const isSimilar = uniqueColors.some(c => 
                Math.abs(c.r - r) < 25 && 
                Math.abs(c.g - g) < 25 && 
                Math.abs(c.b - b) < 25
            );
            
            if (!isSimilar) {
                uniqueColors.push({r, g, b});
            }
        }
    }

    uniqueColors.forEach(colorObj => {
        const colorStr = `rgb(${colorObj.r}, ${colorObj.g}, ${colorObj.b})`;
        const btn = document.createElement('button');
        btn.className = 'color-btn';
        btn.style.backgroundColor = colorStr;
        
        if (container.children.length === 0) {
            btn.classList.add('active');
            state.currentColor = colorStr;
        }

        btn.addEventListener('click', (e) => {
            state.currentColor = colorStr;
            state.currentTool = 'brush';
            
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            document.getElementById('toolBrush').classList.add('active');
        });

        container.appendChild(btn);
    });
}