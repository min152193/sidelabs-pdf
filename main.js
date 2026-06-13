// main.js

import { mergePDFs } from './source/pdf-merge.js';
import { compressPDF } from './source/pdf-compress.js';
import { splitPDF } from './source/pdf-split.js';
import { lockPDF, unlockPDF } from './source/pdf-security.js';
import { managePages } from './source/pdf-page-manager.js';

// HTML 요소 선택
const mergeInput = document.getElementById('merge-input');
const compressInput = document.getElementById('compress-input');
const splitInput = document.getElementById('split-input');
const lockInput = document.getElementById('lock-input');
const unlockInput = document.getElementById('unlock-input');
const manageInput = document.getElementById('manage-input');

// 이벤트 리스너 설정
function setupListeners() {
    mergeInput.addEventListener('change', handleMerge);
    compressInput.addEventListener('change', handleCompress);
    splitInput.addEventListener('change', handleSplit);
    lockInput.addEventListener('change', handleLock);
    unlockInput.addEventListener('change', handleUnlock);
    manageInput.addEventListener('change', handleManage);
}

async function handleMerge(event) {
    const files = event.target.files;
    if (files.length > 0) {
        try {
            console.log('Merging PDFs...');
            const mergedPDF = await mergePDFs([...files].map(file => file.arrayBuffer()));
            downloadFile(mergedPDF, 'merged.pdf');
        } catch (error) {
            console.error('Error merging PDFs:', error);
        }
    }
}

async function handleCompress(event) {
    const file = event.target.files[0];
    if (file) {
        try {
            console.log('Compressing PDF...');
            const compressedPDF = await compressPDF(file.arrayBuffer());
            downloadFile(compressedPDF, 'compressed.pdf');
        } catch (error) {
            console.error('Error compressing PDF:', error);
        }
    }
}

async function handleSplit(event) {
    const file = event.target.files[0];
    if (file) {
        try {
            console.log('Splitting PDF...');
            const pages = await splitPDF(file.arrayBuffer());
            for (let i = 0; i < pages.length; i++) {
                downloadFile(pages[i], `split-page-${i + 1}.pdf`);
            }
        } catch (error) {
            console.error('Error splitting PDF:', error);
        }
    }
}

async function handleLock(event) {
    const file = event.target.files[0];
    if (file) {
        try {
            console.log('Locking PDF...');
            const lockedPDF = await lockPDF(file.arrayBuffer(), 'password');
            downloadFile(lockedPDF, 'locked.pdf');
        } catch (error) {
            console.error('Error locking PDF:', error);
        }
    }
}

async function handleUnlock(event) {
    const file = event.target.files[0];
    if (file) {
        try {
            console.log('Unlocking PDF...');
            const unlockedPDF = await unlockPDF(file.arrayBuffer(), 'password');
            downloadFile(unlockedPDF, 'unlocked.pdf');
        } catch (error) {
            console.error('Error unlocking PDF:', error);
        }
    }
}

async function handleManage(event) {
    const file = event.target.files[0];
    if (file) {
        try {
            console.log('Managing PDF pages...');
            const operation = document.getElementById('manage-operation').value;
            let output;
            if (operation === 'move') {
                const from = parseInt(document.getElementById('from-page').value);
                const to = parseInt(document.getElementById('to-page').value);
                output = await managePages(file.arrayBuffer(), [{ type: 'move', from, to }]);
            } else if (operation === 'delete') {
                const index = parseInt(document.getElementById('delete-index').value);
                output = await managePages(file.arrayBuffer(), [{ type: 'delete', index }]);
            } else if (operation === 'rotate') {
                const index = parseInt(document.getElementById('rotate-index').value);
                const degree = parseInt(document.getElementById('rotate-degree').value);
                output = await managePages(file.arrayBuffer(), [{ type: 'rotate', index, degree }]);
            }
            downloadFile(output, `managed-${operation}.pdf`);
        } catch (error) {
            console.error('Error managing PDF pages:', error);
        }
    }
}

function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

setupListeners();