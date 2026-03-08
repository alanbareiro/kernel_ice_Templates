// src/utils/imagePlaceholder.ts
// Función para generar placeholders en base64 (no requiere internet)
export const getPlaceholder = (text: string, width: number = 800, height: number = 600): string => {
    // Crear un canvas en memoria para generar la imagen
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
        // Fondo gris claro
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, width, height);

        // Borde gris oscuro
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 2;
        ctx.strokeRect(1, 1, width - 2, height - 2);

        // Texto
        ctx.fillStyle = '#999999';
        ctx.font = `bold ${Math.floor(width / 20)}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Dividir texto en líneas si es muy largo
        const words = text.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        words.forEach(word => {
            const testLine = currentLine + (currentLine ? ' ' : '') + word;
            const metrics = ctx.measureText(testLine);
            if (metrics.width > width * 0.8 && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });
        if (currentLine) {
            lines.push(currentLine);
        }

        // Dibujar líneas
        const lineHeight = parseInt(ctx.font) * 1.2;
        const startY = height / 2 - (lines.length - 1) * lineHeight / 2;

        lines.forEach((line, i) => {
            ctx.fillText(line, width / 2, startY + i * lineHeight);
        });
    }

    return canvas.toDataURL('image/png');
};

// Placeholders predefinidos para usar como fallback
export const PLACEHOLDERS = {
    team: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'600\' viewBox=\'0 0 800 600\'%3E%3Crect width=\'800\' height=\'600\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'400\' y=\'300\' font-family=\'Arial\' font-size=\'40\' fill=\'%23999\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3EEquipo%3C/text%3E%3C/svg%3E',
    project: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'600\' viewBox=\'0 0 800 600\'%3E%3Crect width=\'800\' height=\'600\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'400\' y=\'300\' font-family=\'Arial\' font-size=\'40\' fill=\'%23999\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3EProyecto%3C/text%3E%3C/svg%3E',
    logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\' viewBox=\'0 0 200 200\'%3E%3Crect width=\'200\' height=\'200\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'100\' y=\'100\' font-family=\'Arial\' font-size=\'24\' fill=\'%23999\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3ELogo%3C/text%3E%3C/svg%3E',
};