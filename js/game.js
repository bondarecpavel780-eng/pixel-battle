import { generatePalette } from './palette.js';

// Спільний стан гри для всіх модулів
export const state = {
    currentTool: 'brush',
    brushSize: 1,
    currentColor: '#000000',
    currentImageSrc: null // тут буде шлях до поточної картинки
};

const levelImages = {
    easy: ['./images/easy/1.png',
        './images/easy/2.png',
        './images/easy/3.png',
        './images/easy/4.png',
        './images/easy/5.png',
        './images/easy/6.png',
        './images/easy/7.png',
        './images/easy/8.png',
        './images/easy/9.png',
        './images/easy/10.png',
        './images/easy/11.png',
        './images/easy/12.png',
        './images/easy/13.png',
        './images/easy/14.png'],
    medium: ['./images/medium/1.png',
        './images/medium/2.png',
        './images/medium/3.png',
        './images/medium/4.png',
        './images/medium/5.png',
        './images/medium/6.png',
        './images/medium/7.png',
        './images/medium/8.png',
        './images/medium/9.png',
        './images/medium/10.png',
        './images/medium/11.png',
        './images/medium/12.png',
        './images/medium/13.png',
        './images/medium/14.png'
    ],
    hard: ['./images/hard/1.png',
        './images/hard/2.png',
        './images/hard/3.png',
        './images/hard/4.png',
        './images/hard/5.png',
        './images/hard/6.png',
        './images/hard/7.png',
        './images/hard/8.png',
        './images/hard/9.png',
        './images/hard/10.png',
        './images/hard/11.png',
        './images/hard/12.png',
        './images/hard/13.png',
        './images/hard/14.png'
    ]
};

export function loadRandomImage(level, refCtx, refCanvas, paletteContainer) {
    const images = levelImages[level];
    if (!images || images.length === 0) return;

    // список, з якого викидаємо поточну картинку
    let availableImages = images.filter(src => src !== state.currentImageSrc);
    if (availableImages.length === 0) {
        availableImages = images; 
    }

    const randomSrc = availableImages[Math.floor(Math.random() * availableImages.length)]; // трішки змінюємо формулу
    state.currentImageSrc = randomSrc;

    const img = new Image();
    img.src = randomSrc;
    img.onload = () => {
        refCtx.clearRect(0, 0, refCanvas.width, refCanvas.height);
        refCtx.drawImage(img, 0, 0, 64, 64);
        // Передаємо ту саму картинку в наш трафарет
        document.getElementById('ghostImage').src = img.src;

        generatePalette(refCtx, paletteContainer, state);
        document.getElementById('loupe').style.backgroundImage = `url('${img.src}')`;
    };
}