// source/pdf-merge.js

export async function mergePDFs(uint8Array1, uint8Array2) {
    // 1. 문서 로드
    const pdfDoc1 = await PDFLib.PDFDocument.load(uint8Array1);
    const pdfDoc2 = await PDFLib.PDFDocument.load(uint8Array2);

    // 2. 페이지 인덱스 병렬 배열 생성
    const indices = pdfDoc2.getPageIndices();

    // 3. Promise.all로 페이지 복사 병렬 처리
    const copiedPagesPromises = indices.map(index => 
        pdfDoc1.copyPage(pdfDoc2, index)
    );

    // 모든 페이지 복사 Promise가 완료될 때까지 대기
    await Promise.all(copiedPagesPromises);

    // 4. 복사된 페이지들 추가
    for (const page of copiedPages) {
        pdfDoc1.addPage(page);
    }

    // 5. 직렬화하여 반환
    return await pdfDoc1.save();
}
