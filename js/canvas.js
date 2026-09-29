export function initCanvas(canvas, ctx, state) {
    let isDrawing = false;

    // Універсальна функція для отримання координат
    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // Перевірка дотик чи клік 
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        return {
            x: Math.floor((clientX - rect.left) * scaleX),
            y: Math.floor((clientY - rect.top) * scaleY)
        };
    }

    function drawPixel(e) {
        // Якщо дотиків 2 або більше (зум або скрол) - перериваємо малювання
        if (e.touches && e.touches.length > 1) {
            isDrawing = false;
            return;
        }

        if (!isDrawing) return;

        // Блокуємо скрол тільки коли малюємо одним пальцем
        if (e.cancelable) e.preventDefault();

        const pos = getMousePos(e);

        if (state.currentTool === 'brush') {
            ctx.fillStyle = state.currentColor;
            ctx.fillRect(pos.x, pos.y, state.brushSize, state.brushSize);
        } else if (state.currentTool === 'eraser') {
            ctx.clearRect(pos.x, pos.y, state.brushSize, state.brushSize);
        }
    }

    const startDrawing = (e) => {
        if (canvas.dataset.canDraw !== 'true') return;

        // Ігноруємо старт малювання, якщо користувач використовує два пальці
        if (e.touches && e.touches.length > 1) return;

        isDrawing = true;
        drawPixel(e);
    };

    function stopDrawing() {
        isDrawing = false;
    }

    // Події для миші (ПК)
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', drawPixel);
    window.addEventListener('mouseup', stopDrawing);

    // Події для телефонів
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', drawPixel, { passive: false });
    window.addEventListener('touchend', stopDrawing);
    window.addEventListener('touchcancel', stopDrawing);
}