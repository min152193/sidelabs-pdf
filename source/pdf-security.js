// source/pdf-security.js

import { PDFDocument, Permission } from 'pdf-lib';

/**
 * PDF 편집 제한 해제
 * @param {Uint8Array} uint8Array - 대상 PDF 바이너리
 * @returns {Promise<Uint8Array>} - 제한이 해제된 PDF 바이너리
 */
export async function removeEditRestrictions(uint8Array) {
    try {
        // 문서 로드 (보안 플래그 포함)
        const pdfDoc = await PDFDocument.load(uint8Array);

        // 새로운 문서 컨테이너 생성 (권한 플래그 초기화)
        const newPdfDoc = await PDFDocument.create();
        const copiedPages = await newPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => newPdfDoc.addPage(page));

        // 직렬화
        return await newPdfDoc.save();
    } catch (error) {
        // 로드 실패 시 보안 문서 여부 확인
        if (error.name === 'PasswordError' || error.message.toLowerCase().includes('password')) {
            throw new Error("보안 문서입니다. 비밀번호가 필요합니다.");
        }
        throw new Error(`편집 제한 해제 실패: ${error.message}`);
    }
}

/**
 * PDF 암호화
 * @param {Uint8Array} uint8Array - 대상 PDF 바이너리
 * @param {string} password - 설정할 비밀번호
 * @returns {Promise<Uint8Array>} - 암호화된 PDF 바이너리
 */
export async function lockPDF(uint8Array, password) {
    try {
        const pdfDoc = await PDFDocument.load(uint8Array);

        // AES-256
        await pdfDoc.encrypt({
            userPassword: password,
            ownerPassword: password,
            permissions: {
                print: Permission.NotAllowed,
                modify: Permission.NotAllowed,
                copy: Permission.NotAllowed,
            },
        });

        return await pdfDoc.save();
    } catch (error) {
        throw new Error(`PDF 잠금 적용 실패: ${error.message}`);
    }
}