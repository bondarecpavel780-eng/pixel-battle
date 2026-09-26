export function initCanvas(canvas, ctx, state) {
    let isDrawing = false;

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        return {
            x: Math.floor((e.clientX - rect.left) * scaleX),
            y: Math.floor((e.clientY - rect.top) * scaleY)
        };
    }

    function drawPixel(e) {
        if (!isDrawing) return;
        const pos = getMousePos(e);

        if (state.currentTool === 'brush') {
            ctx.fillStyle = state.currentColor;
            ctx.fillRect(pos.x, pos.y, state.brushSize, state.brushSize);
        } else if (state.currentTool === 'eraser') {
            ctx.clearRect(pos.x, pos.y, state.brushSize, state.brushSize);
        }
    }

    canvas.addEventListener('mousedown', (e) => {
        if (canvas.dataset.canDraw !== 'true') return;
        isDrawing = true;
        drawPixel(e);
    });
    canvas.addEventListener('mousemove', drawPixel);
    window.addEventListener('mouseup', () => isDrawing = false);
}