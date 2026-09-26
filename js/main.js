import { state, loadRandomImage } from './game.js';
import { initCanvas } from './canvas.js';
import { checkAccuracy } from './checker.js';
import { initLoupe } from './loupe.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('userCanvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const refCanvas = document.getElementById('referenceCanvas');
    const refCtx = refCanvas.getContext('2d', { willReadFrequently: true });

    const loupeElement = document.getElementById('loupe');
    initLoupe(refCanvas, loupeElement);

    const paletteContainer = document.getElementById('palette');
    const scoreDisplay = document.querySelector('#scoreDisplay span');
    const levelSelect = document.getElementById('levelSelect');
    const loadLevelBtn = document.getElementById('loadLevelBtn');

    // Логіка увімкнення/вимкнення підказки (трафарету)
    const hintToggle = document.getElementById('hintToggle');
    const ghostImage = document.getElementById('ghostImage');

    hintToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            ghostImage.classList.remove('hidden'); // Показуємо
        } else {
            ghostImage.classList.add('hidden'); // Ховаємо
        }
    });

    // 1. Початкова ініціалізація (БЕЗ автозавантаження картинки)
    initCanvas(canvas, ctx, state);

    // 2. Управління інструментами (заливку вирізано)
    document.getElementById('toolBrush').addEventListener('click', (e) => {
        state.currentTool = 'brush';
        updateActive(e.target, '.tool-btn');
    });

    document.getElementById('toolEraser').addEventListener('click', (e) => {
        state.currentTool = 'eraser';
        updateActive(e.target, '.tool-btn');
    });

    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.brushSize = parseInt(e.target.dataset.size);
            updateActive(e.target, '.size-btn');
        });
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // 3. Логіка кнопок
    loadLevelBtn.addEventListener('click', () => {
        // Картинка генерується тільки тут
        loadRandomImage(levelSelect.value, refCtx, refCanvas, paletteContainer);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаємо поле гравця
        scoreDisplay.textContent = '0.0%';

        document.getElementById('nextBtn').disabled = false;
        // Даємо дозвіл на малювання
        document.getElementById('userCanvas').dataset.canDraw = 'true';
    });

    document.getElementById('checkBtn').addEventListener('click', () => {
        checkAccuracy(refCtx, ctx, scoreDisplay);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        loadRandomImage(levelSelect.value, refCtx, refCanvas, paletteContainer);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        scoreDisplay.textContent = '0.0%';
    });

    function updateActive(clickedBtn, selector) {
        document.querySelectorAll(selector).forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
    }
});