// source/pdf-compress.js

import { PDFDocument } from 'pdf-lib';
import { createObjectURL, revokeObjectURL } from 'pdfjs-dist/build/pdf.worker.entry';

export async function compressPDF(uint8Array, quality) {
    // 1. 입력 PDF 문서 로드
    const pdfDoc = await PDFLib.PDFDocument.load(uint8Array);

    // 2. 각 페이지를 순회하여 이미지 품질 변경
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const page = pdfDoc.getPage(i);
        const images = page.getImages();

        for (const image of images) {
            // 이미지를 canvas로 변환하여 새로운 품질로 재코딩
            const imgData = await image.scaleTo(quality).saveAsPng();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.onload = async () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = canvas.toDataURL('image/png', quality);
                const imageBytes = Uint8Array.from(atob(imageData.split(',')[1]), c => c.charCodeAt(0));

                // 기존 페이지에서 이미지 객체를 제거하고 새로운 이미지를 추가합니다.
                page.removeObject(image);
                const newXrefIndex = await pdfDoc.embedPng(imageBytes);
                page.setContents(page.getContents().replace(image.ref.toString(), newXrefIndex.toString()));
            };
            img.src = imgData;
        }
    }

    // 3. 변경된 PDF 문서 직렬화하여 반환
    return await pdfDoc.save();
}
