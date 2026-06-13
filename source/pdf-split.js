// source/pdf-split.js

import { PDFDocument } from 'pdf-lib';

export async function splitPDF(uint8Array) {
    // 1. 입력 PDF 문서 로드
    const pdfDoc = await PDFLib.PDFDocument.load(uint8Array);

    // 2. 각 페이지를 순회하여 새로운 PDF 문서 생성
    const singlePagePDFs = [];
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        const page = pdfDoc.getPage(i);
        const newPdfDoc = await PDFDocument.create();
        newPdfDoc.addPage(page);

        // 새로운 페이지가 포함된 PDF를 직렬화하여 배열에 추가
        singlePagePDFs.push(await newPdfDoc.save());
    }

    return singlePagePDFs;
}
