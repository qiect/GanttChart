import { toPng, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
export async function exportChart(element, options) {
    const { format, quality, scale, backgroundColor } = options;
    // Temporarily remove zoom transform for clean export
    const originalTransform = element.style.transform;
    const originalTransformOrigin = element.style.transformOrigin;
    element.style.transform = 'none';
    element.style.transformOrigin = 'top left';
    try {
        switch (format) {
            case 'png':
                await exportAsPng(element, quality, scale, backgroundColor);
                break;
            case 'svg':
                await exportAsSvg(element, backgroundColor);
                break;
            case 'pdf':
                await exportAsPdf(element, scale, backgroundColor);
                break;
        }
    }
    finally {
        // Restore zoom transform
        element.style.transform = originalTransform;
        element.style.transformOrigin = originalTransformOrigin;
    }
}
async function exportAsPng(element, quality, scale, backgroundColor) {
    const dataUrl = await toPng(element, {
        quality,
        pixelRatio: scale,
        backgroundColor,
    });
    saveAs(dataUrl, 'gantt-chart.png');
}
async function exportAsSvg(element, backgroundColor) {
    const dataUrl = await toSvg(element, { backgroundColor });
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    saveAs(blob, 'gantt-chart.svg');
}
async function exportAsPdf(element, scale, backgroundColor) {
    const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: scale,
        backgroundColor,
    });
    const img = new Image();
    await new Promise((resolve) => {
        img.onload = () => resolve();
        img.src = dataUrl;
    });
    const imgWidth = img.width;
    const imgHeight = img.height;
    const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait';
    const pdf = new jsPDF(orientation, 'px', [imgWidth, imgHeight]);
    pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('gantt-chart.pdf');
}
export function exportMermaidCode(code) {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'gantt-chart.mmd');
}
export function importMermaidCode() {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.mmd,.mermaid,.txt';
        input.onchange = (e) => {
            const file = e.target.files?.[0];
            if (!file) {
                reject(new Error('未选择文件'));
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target?.result);
            };
            reader.onerror = () => reject(new Error('文件读取失败'));
            reader.readAsText(file);
        };
        input.click();
    });
}
