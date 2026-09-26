export function initLoupe(canvasElement, loupeElement) {
    const zoomLevel = 2;
    const wrapper = canvasElement.parentElement;

    loupeElement.style.pointerEvents = 'none';

    wrapper.addEventListener('mouseenter', () => {
        // Не показуємо лупу, якщо еталон ще не завантажено
        if (!loupeElement.style.backgroundImage) return;

        loupeElement.style.display = 'block';
        loupeElement.style.backgroundSize = `${canvasElement.offsetWidth * zoomLevel}px ${canvasElement.offsetHeight * zoomLevel}px`;
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (loupeElement.style.display !== 'block') return;

        const rect = canvasElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        loupeElement.style.left = `${x - (loupeElement.offsetWidth / 2)}px`;
        loupeElement.style.top = `${y - (loupeElement.offsetHeight / 2)}px`;

        const bgX = (x * zoomLevel) - (loupeElement.offsetWidth / 2);
        const bgY = (y * zoomLevel) - (loupeElement.offsetHeight / 2);

        loupeElement.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    });

    wrapper.addEventListener('mouseleave', () => {
        loupeElement.style.display = 'none';
    });
}