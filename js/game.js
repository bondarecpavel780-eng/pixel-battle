import { generatePalette } from './palette.js';

// Спільний стан гри для всіх модулів
export const state = {
    currentTool: 'brush',
    brushSize: 1,
    currentColor: '#000000'
};

const levelImages = {
    easy: ['./images/easy/1.png',
         './images/easy/2.png',
        './images/easy/3.png'],
    medium: ['./images/medium/1.png',
        './images/medium/2.png',
        './images/medium/3.png',
        './images/medium/4.png'
    ],
    hard: ['./images/hard/1.png',
        './images/hard/2.png',
        './images/hard/3.png',
        './images/hard/4.png',
        './images/hard/5.png',
    ]
};

export function loadRandomImage(level, refCtx, refCanvas, paletteContainer) {
    const images = levelImages[level];
    if (!images || images.length === 0) return; 

    const randomSrc = images[Math.floor(Math.random() * images.length)];
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