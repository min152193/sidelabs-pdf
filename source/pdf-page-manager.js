// source/pdf-page-manager.js

import { PDFDocument } from 'pdf-lib';

export async function managePages(uint8Array, operationsArray) {
    const pdfDoc = await PDFLib.PDFDocument.load(uint8Array);

    for (const operation of operationsArray) {
        switch (operation.type) {
            case 'move':
                if (operation.from >= 0 && operation.to >= 0 && operation.from !== operation.to) {
                    // 페이지 이동 시 인덱스 보정
                    if (operation.from < operation.to) {
                        operation.to -= 1;
                    }
                    const page = pdfDoc.getPage(operation.from);
                    pdfDoc.removePage(operation.from);
                    pdfDoc.insertPage(operation.to, page);
                }
                break;
            case 'delete':
                if (operation.index >= 0 && operation.index < pdfDoc.getPageCount()) {
                    pdfDoc.removePage(operation.index);
                }
                break;
            case 'rotate':
                if (operation.index >= 0 && operation.index < pdfDoc.getPageCount() && operation.degree % 90 === 0) {
                    const page = pdfDoc.getPage(operation.index);
                    page.setRotation((page.getRotation() + operation.degree) % 360);
                }
                break;
            default:
                console.warn(`Unknown operation type: ${operation.type}`);
        }
    }

    // 저장 후 반환
    return await pdfDoc.save();
}
