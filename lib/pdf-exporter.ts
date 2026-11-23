import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

export interface ExportProgressCallback {
  (current: number, total: number, message: string): void;
}

/**
 * Ultra-sharp client-side 4:5 LinkedIn Carousel PDF Exporter
 * Powered by html-to-image (browser native rendering) + jsPDF
 * Supports modern CSS (oklab, lab, gradients, filters) without parser crashes
 */
export async function exportCarouselToPDF(
  slideElements: HTMLElement[],
  filename: string = 'linkedin-carousel',
  onProgress?: ExportProgressCallback
): Promise<void> {
  if (!slideElements || slideElements.length === 0) {
    throw new Error('No slide elements found to export');
  }

  const total = slideElements.length;
  onProgress?.(0, total, 'Preparing slides for rendering...');

  // 4:5 LinkedIn Carousel Standard dimensions (1080 x 1350 px)
  const pdfWidth = 1080;
  const pdfHeight = 1350;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [pdfWidth, pdfHeight],
    hotfixes: ['px_scaling'],
  });

  for (let i = 0; i < total; i++) {
    const el = slideElements[i];
    onProgress?.(i + 1, total, `Rendering slide ${i + 1} of ${total}...`);

    // Use html-to-image with pixelRatio: 2 for sharp 2160x2700 internal resolution
    const imgData = await toPng(el, {
      pixelRatio: 2,
      cacheBust: true,
      width: pdfWidth,
      height: pdfHeight,
      skipAutoScale: true,
    });

    if (i > 0) {
      pdf.addPage([pdfWidth, pdfHeight], 'portrait');
    }

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  }

  onProgress?.(total, total, 'Compiling PDF document...');
  const cleanFilename = filename.toLowerCase().replace(/[^a-z0-9_-]/g, '-').slice(0, 40);
  pdf.save(`${cleanFilename || 'linkedin-carousel'}.pdf`);
  onProgress?.(total, total, 'Download ready!');
}
