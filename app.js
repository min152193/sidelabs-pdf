// sidepdf - ultimate serverless pdf suite application logic

// Global PDFLib Destructuring Safeguard
const { PDFDocument, rgb, degrees, StandardFonts, PDFName, PDFDict, PDFRawStream, PDFNumber, PDFArray } = PDFLib;

const ICONS = {
    layers: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-10 5L12 13l10-5-10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>`,
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    languages: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
    trash2: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
    stamp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"/><path d="M19.27 13.73A2.5 2.5 0 0 0 17.5 13H6.5a2.5 2.5 0 0 0-1.77.73l-1.03 1.03A1 1 0 0 0 4 15.47V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1.53a1 1 0 0 0-.3-.71l-1.43-1.43Z"/><path d="M12 13V2a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v11"/></svg>`,
    hash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>`,
    scissors: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="9.8" x2="20" y1="8.2" y2="18.4"/><line x1="9.8" x2="20" y1="15.8" y2="5.6"/></svg>`,
    files: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.5 2H8.66a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.34a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/><path d="M12 18H8"/><path d="M12 14H8"/><path d="M16 10H8"/><path d="M16 6H8"/></svg>`,
    fileText: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
    download: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    rotateCw: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.72 2.78L21 8"/><polyline points="15 3 21 3 21 9"/></svg>`,
    rotateCcw: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><polyline points="3 3 3 8 8 8"/></svg>`,
    arrowUpDown: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>`,
    sortAsc: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="M11 4h10"/><path d="M11 8h7"/><path d="M11 12h4"/></svg>`,
    fileUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><polyline points="9 15 12 12 15 15"/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5 5 3Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    alertTriangle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
    sunMoon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><path d="M12.5 6A6 6 0 0 1 18 11.5a6 6 0 0 1-5.5 6 6 6 0 0 1 0-12z"/></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    sliders: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/></svg>`
};

function getIconSvg(name, customClass = '') {
    const raw = ICONS[name] || '';
    if (!raw) return '';
    if (customClass) {
        return raw.replace('<svg ', `<svg class="${customClass}" `);
    }
    return raw;
}

// Global States
let queue = [];
let uploadedFiles = {};
let filePasswords = {};
let loadedDocsPdfLib = {}; // Global PDFDocument cache to prevent reloading and detached buffer crashes
let activeTab = 'tab-merge';
let splitMode = 'all';
let currentLang = localStorage.getItem('lang') || 'en';

// Localization Lookup
const translations = {
    en: {
        logo_title: "SidePDF",
        lbl_compress_toggle: "Reduce PDF Size (Compress)",
        compress_warning_text: "Warning: Reducing compression quality below 75% may severely degrade text readability.",
        security_tooltip_text: "All files are processed locally within your browser or end-to-end encrypted during transfer, and permanently deleted from the server immediately upon completion.",
        how_does_it_work: "How does it work?",
        security_modal_title: "Security & Privacy",
        security_modal_desc: "All files are processed locally within your browser or end-to-end encrypted during transfer, and permanently deleted from the server immediately upon completion.",
        close_btn: "Close",
        privacy_policy_link: "Privacy Policy",
        privacy_modal_title: "Privacy Policy",
        privacy_policy_text: `SidePDF ("we", "our", or "the Service") values your privacy and strictly adheres to global data protection standards.\n\n1. Zero Server Transfer & Local Processing\nOur application is entirely client-side. Any PDF documents or image assets you upload are processed strictly within your local browser memory sandbox (RAM and CPU threads). No structural segments of your file binaries are ever transmitted to or held on external servers.\n\n2. Google Tag Manager (GTM) Telemetry Disclosure\nTo observe utilization footprints and optimize interface utility layouts, we leverage Google Tag Manager (Container: GTM-W2XNXZ7N). This integration does NOT track, extract, or hold private information or raw asset bytes. It securely routes aggregated anonymized action tags, interface event counters, and generic browser environments to analysis gateways.\n\n3. Google AdSense & Cookie Compliance\nTo fund our infrastructure at zero cost to users, we may display programmatic Google AdSense advertisement widgets. Third-party ad networks utilize tracking cookies to analyze non-identifiable footprints and serve contextual marketing banners. You can disable cookie compliance allocations inside your native browser preference rules at any time.\n\n4. Contact and Compliance Support\nFor any engineering architecture or privacy metrics inquiries, reach out to our administration at:\n- Email: contact@sidelabs.net`,
        lang_label: "Language",
        add_files: "Add Files",
        clear: "Clear",
        merge_style: "Merge & Style",
        split_extract: "Split & Extract",
        watermark_overlay: "Watermark Overlay",
        watermark_text: "Watermark Text",
        color: "Color",
        opacity: "Opacity",
        font_size: "Font Size",
        angle: "Angle (deg)",
        page_numbering: "Page Numbering",
        format: "Format",
        simple_format: "Simple (\"1\", \"2\")",
        page_of_format: "Page of Total (\"Page 1 of 10\")",
        position: "Position",
        bottom_center: "Bottom Center",
        bottom_right: "Bottom Right",
        top_right: "Top Right",
        split_extract_config: "Split & Extract Configuration",
        split_all_pages: "Split All Pages",
        split_all_desc: "Generates a separate PDF for every page. Packaged as a single ZIP file.",
        extract_specific_pages: "Extract Specific Pages",
        extract_desc: "Extract only selected pages into a single combined PDF.",
        define_page_range: "Define Page Range",
        define_range_ph: "e.g., 1-5, 8, 11-13",
        range_status_help: "Enter page numbers or ranges. Matches will highlight in the grid.",
        compile_export: "Compile & Export PDF",
        privacy_text: "No data sent to servers. 100% secure.",
        rotate_all: "Rotate All",
        reverse: "Reverse",
        sort_by_name: "Sort by Name",
        drop_title: "Drop your PDFs or Images here",
        drop_desc: "Drag multiple PDF files, PNGs, or JPGs to build your queue. Rearrange, rotate, and manipulate them completely in-browser.",
        browse_files: "Browse Files",
        demo_label: "Want to test it out?",
        load_sample_pdf: "Load Sample PDF",
        unlock_pdf_title: "Unlock PDF Document",
        unlock_pdf_desc: "This PDF document is encrypted and requires a password to open and process.",
        incorrect_password: "Incorrect password. Please try again.",
        cancel: "Cancel",
        decrypt_file: "Decrypt File",
        theme_label: "Theme",
        theme_light: "Light",
        theme_dark: "Dark",
        theme_auto: "Auto",
        total_pages: "Total Pages",
        compress_quality: "Compression Quality",
        filters_panel_title: "PDF Optimization & Processing Filters",
        strip_ocr_title: "Strip OCR Text Stream",
        strip_ocr_desc: "Clean out invisible OCR text overlay layers to cut down bytes.",
        flatten_vector_title: "Flatten Vector Ink Strokes",
        flatten_vector_desc: "Consolidate heavily fragmented standalone paths to prevent lag.",
        grayscale_title: "Convert to Grayscale (B&W Filter)",
        grayscale_desc: "Map RGB/CMYK stream definitions into single-channel luminance.",
        split_format_label: "Export Format",
        format_pdf: "PDF Document (.pdf)",
        format_jpg: "JPEG Image (.jpg)",
        format_png: "PNG Image (.png)",
        
        toast_no_valid: "No valid files detected. Drop PDF, JPEG, or PNG files only.",
        toast_skipped_dup: "Some files were already in the queue and were skipped.",
        toast_load_fail: "Failed to load files fully.",
        toast_parse_fail: "Parse failure on \"{0}\": {1}",
        toast_download_success: "Unlocked PDF downloaded successfully!",
        toast_merge_success: "Styled PDF compiled and downloaded successfully!",
        toast_extract_success: "Extracted pages compiled and downloaded successfully!",
        toast_zip_success: "Successfully generated split pages ZIP!",
        toast_queue_cleared: "Workspace cleared.",
        toast_reversed: "Reversed visual page sequence.",
        toast_sorted: "Sorted queue by file names.",
        toast_rotated_all: "Rotated all pages in visual grid.",
        toast_empty_queue: "The workspace queue is empty. Load files to begin.",
        toast_invalid_range: "Please define a valid page range to extract.",
        toast_demo_loaded: "Sample PDF generated and loaded!",
        toast_invalid_ranges_err: "Invalid page ranges: {0}",
        toast_no_valid_pages_err: "No valid pages selected for extraction.",
        toast_split_fail: "Failed to split: {0}",
        toast_compile_fail: "Failed to compile: {0}",
        toast_pw_aborted: "Password entry aborted.",
        toast_unlock_success: "File decrypted successfully.",
        toast_clear_confirm: "Are you sure you want to clear the active workspace queue?",

        loading_files: "Loading and processing files...",
        loading_warning: "Do not switch tabs or minimize the browser while processing large files to prevent execution throttling.",
        purging_workspace: "Purging canvas workspace...",
        rotating_pipeline: "Rotating pipeline assets...",
        reversing_layout: "Reversing document layout sequence...",
        sorting_pipeline: "Sorting asset grid pipeline...",
        compiling_pdf: "Compiling PDF...",
        unlocking_assembling: "Unlocking & Assembling page {0}/{1}...",
        stamping_watermark: "Stamping Watermark...",
        stamping_watermark_sub: "Overlaying custom diagonal watermark texts...",
        numbering_pages: "Numbering pages...",
        numbering_pages_sub: "Stamping document footer markers...",
        saving_final: "Saving final document...",
        saving_final_sub: "Generating PDF binary layout stream...",
        splitting_document: "Splitting document...",
        splitting_document_sub: "Packaging individual single-page documents...",
        packaging_zip: "Packaging ZIP Archive...",
        packaging_zip_sub: "Generating ZIP file stream...",
        generating_sample: "Generating sample PDF...",
        generating_sample_sub: "Synthesizing demo document in local environment...",
        loading_title_processing: "Processing PDF...",
        loading_text_rendering: "Extracting and rendering pages to visual queue.",
        
        btn_compile_export: "Compile & Export PDF",
        btn_split_download: "Split & Download ZIP",
        btn_extract_export: "Extract & Export PDF",
        
        range_indicator_empty: "Enter page numbers or ranges. Matches will highlight in the grid.",
        range_indicator_invalid: "No pages matched. Verify your range input expression.",
        range_indicator_valid: "Expression targets {0} of {1} pages."
    },
    ko: {
    logo_title: "SidePDF",
    client_side_badge: "로컬 보안 처리",
    total_pages: "총 페이지 수",
    add_files: "파일 추가",
    clear: "비우기",
    merge_style: "병합 및 편집",
    split_extract: "분할 및 추출",
    watermark_overlay: "워터마크 삽입",
    watermark_text: "문구 입력",
    color: "글자 색상",
    opacity: "투명도",
    font_size: "글자 크기",
    angle: "회전 각도",
    page_numbering: "페이지 번호 매기기",
    format: "표시 형식",
    simple_format: "기본형 (1, 2, 3...)",
    page_of_format: "전체 페이지 포함 (Page 1 of 10)",
    position: "출력 위치",
    bottom_center: "하단 중앙",
    bottom_right: "하단 우측",
    top_right: "상단 우측",
    split_extract_config: "분할 및 추출 상세 설정",
    split_all_pages: "모든 페이지 각각 나누기",
    split_all_desc: "모든 페이지를 한 장씩 개별 PDF 파일로 분할한 뒤, 하나의 ZIP 압축 파일로 다운로드합니다.",
    extract_specific_pages: "원하는 페이지 지정 추출",
    extract_desc: "선택하거나 입력한 특정 페이지들만 쏙 골라내어 하나의 결합된 PDF 파일로 만듭니다.",
    define_page_range: "추출할 페이지 범위 입력",
    define_range_ph: "입력 예시: 1-5, 8, 11-13",
    range_status_help: "페이지 번호나 범위를 입력하면 상단 그리드 화면에 자동으로 하이라이트됩니다.",
    compile_export: "최종 PDF 변환 및 다운로드",
    privacy_text: "안심하세요. 모든 파일은 전송 없이 브라우저 내에서 100% 안전하게 처리됩니다.",
    rotate_all: "전체 회전",
    reverse: "순서 반전",
    sort_by_name: "이름순 정렬",
    drop_title: "여기에 PDF 또는 이미지를 끌어다 놓으세요",
    drop_desc: "여러 개의 PDF 파일이나 이미지(PNG, JPG)를 한 번에 마우스로 끌어다 놓으세요. 프로그램 설치 없이 브라우저 안에서 자유롭게 순서 변경, 회전, 편집이 가능합니다.",
    browse_files: "내 컴퓨터에서 찾기",
    demo_label: "기능을 먼저 테스트해보고 싶으신가요?",
    load_sample_pdf: "샘플 PDF 파일 가져오기",
    unlock_pdf_title: "비밀번호가 걸린 PDF 문서입니다",
    unlock_pdf_desc: "이 파일은 보안을 위해 암호화되어 있습니다. 열기 위한 비밀번호를 입력해 주세요.",
    cancel: "취소",
    decrypt_file: "암호 해제 및 가져오기",
    theme_label: "화면 테마",
    theme_light: "라이트 모드",
    theme_dark: "다크 모드",
    theme_auto: "기기 설정 동기화",
    lang_label: "언어 설정",
    compress_quality: "압축 강도 (화질 균형)",
    lbl_compress_toggle: "PDF 용량 최적화 (용량 줄이기)",
    compress_warning_text: "주의: 압축 화질을 75% 이하로 너무 낮추면 문서 내 작은 글씨의 가독성이 떨어질 수 있습니다.",
    security_tooltip_text: "SidePDF는 무자본 서버리스 아키텍처로 구현되었습니다. 사용자의 파일은 중앙 서버로 절대 전송되지 않으며, 오직 현재 브라우저의 일시적인 샌드박스 메모리 안에서만 연산된 후 완전히 파기되므로 유출 우려가 0%입니다.",
    how_does_it_work: "보안 원리가 무엇인가요?",
    security_modal_title: "보안 및 개인정보 보호 안내",
    security_modal_desc: "SidePDF는 무자본 서버리스 아키텍처로 구현되었습니다. 사용자의 파일은 외부 서버로 일절 전송되지 않으며, 오직 현재 브라우저의 일시적인 샌드박스 메모리(RAM) 안에서만 처리된 후 즉시 휘발되므로 유출 가능성이 원천 차단됩니다.",
    close_btn: "닫기",
    
    // 고급 필터 패널 (학술/엔지니어링 명사를 깔끔한 일반 SaaS 용어로 정제)
    filters_panel_title: "문서 용량 최적화 및 필터 고급 설정",
    strip_ocr_title: "불필요한 OCR 텍스트 레이어 제거",
    strip_ocr_desc: "스캔 문서 뒤에 숨겨진 텍스트 메타데이터 스트림을 삭제하여 용량을 추가로 확보합니다.",
    flatten_vector_title: "태블릿 필기 데이터 병합 (렉 줄이기)",
    flatten_vector_desc: "굿노트, 노타빌리티 등에서 조각난 펜 필기(벡터 획) 경로를 하나로 합쳐 파일 열람 시 버벅임과 렉을 줄입니다.",
    grayscale_title: "출력 필터 흑백 변환 (그레이스케일)",
    grayscale_desc: "컬러 문서의 RGB/CMYK 색상 요소를 단색 무채색 채널로 일괄 매핑하여 인쇄용 용량을 극한으로 줄입니다.",
    
    split_format_label: "저장할 확장자 형식",
    format_pdf: "PDF 문서 파일 (.pdf)",
    format_jpg: "JPEG 이미지 이미지 (.jpg)",
    format_png: "PNG 고화질 이미지 (.png)",

    // 실시간 로딩 텍스트 (사용자가 진행 상황을 직관적으로 보게 동사형 명사로 정제)
        loading_files: "파일을 읽어와 분석하는 중...",
        loading_warning: "대용량 문서를 처리할 때는 브라우저 탭을 전환하거나 창을 최소화하면 연산이 일시 중단될 수 있습니다. 변환이 끝날 때까지 이 화면을 유지해 주세요.",
        purging_workspace: "작업 공간을 깨끗하게 비우는 중...",
        rotating_pipeline: "선택한 페이지들을 회전시키는 중...",
        reversing_layout: "문서의 페이지 정렬 순서를 뒤집는 중...",
        sorting_pipeline: "파일 이름을 기준으로 순서를 정렬하는 중...",
        compiling_pdf: "새로운 PDF 문서 구성 중...",
        unlocking_assembling: "페이지 데이터 인덱싱 및 재배치 중 ({0}/{1})...",
        stamping_watermark: "페이지 위에 워터마크 레이어 합성 중...",
        stamping_watermark_sub: "설정하신 대각선 반투명 텍스트 오버레이 적용 중...",
        numbering_pages: "바닥글 페이지 번호 생성 중...",
        numbering_pages_sub: "문서 하단 하단 영역에 고유 일련번호 마킹 중...",
        saving_final: "최종 최적화 문서 빌드 중...",
        saving_final_sub: "출력용 PDF 바이너리 바이너리 스트림 파일 생성 중...",
        splitting_document: "지정한 단일 페이지 쪼개는 중...",
        splitting_document_sub: "개별 한 장짜리 독립 문서로 패키징 처리 중...",
        packaging_zip: "분할된 파일 압축 패키지 구성 중...",
        packaging_zip_sub: "ZIP 압축 스트림 변환 엔진 가동 중...",
        generating_sample: "테스트용 데모 파일 생성 중...",
        generating_sample_sub: "유저 브라우저 환경에서 자체 샘플 문서 합성 중...",
        loading_title_processing: "Processing PDF...",
        loading_text_rendering: "Extracting and rendering pages to visual queue.",
        
        btn_compile_export: "Compile & Export PDF",
        btn_split_download: "Split & Download ZIP",
        btn_extract_export: "Extract & Export PDF",
        
        range_indicator_empty: "Enter page numbers or ranges. Matches will highlight in the grid.",
        range_indicator_invalid: "No pages matched. Verify your range input expression.",
        range_indicator_valid: "Expression targets {0} of {1} pages."
    }
};

function t(key, ...args) {
    const langObj = translations[currentLang] || translations['en'];
    let val = langObj[key] || translations['en'][key] || key;
    if (args.length > 0) {
        args.forEach((arg, idx) => {
            val = val.replace(`{${idx}}`, arg);
        });
    }
    return val;
}

// UI Localization Sync
function updateUILanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.setAttribute('placeholder', t(key));
    });
    
    updatePrimaryActionButtonText();
    updateSummary();
    handleRangeInput();
}

// Theme Engine Setup
function initTheme() {
    const themeSelect = document.getElementById('theme-select');
    if (!themeSelect) return;

    // Default to 'auto' if no theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme') || 'auto';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);

    themeSelect.addEventListener('change', (e) => {
        const theme = e.target.value;
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (themeSelect.value === 'auto') {
            applyTheme('auto');
        }
    });
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.dataset.theme = 'dark';
        document.body.classList.remove('light-mode');
    } else if (theme === 'light') {
        document.body.dataset.theme = 'light';
        document.body.classList.add('light-mode');
    } else if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.dataset.theme = 'dark';
            document.body.classList.remove('light-mode');
        } else {
            document.body.dataset.theme = 'light';
            document.body.classList.add('light-mode');
        }
    }
}

function updateDocumentMetadata(lang) {
    const metaConfig = {
        ko: {
            title: "SidePDF - 안전한 로컬 PDF 편집기",
            desc: "파일 업로드 없는 PDF 최적화. 압축, 분할, 병합, 편집 잠금 해제를 개인정보 걱정 없이 해결하세요."
        },
        en: {
            title: "SidePDF - Private Secure PDF Suite",
            desc: "Optimize, split, and merge documents directly in your browser. Zero server uploads, absolute data privacy, and instant local processing."
        }
    };
    const config = metaConfig[lang] || metaConfig['en'];
    
    document.title = config.title;
    
    document.querySelector('meta[name="description"]')?.setAttribute('content', config.desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', config.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', config.desc);
}

// Language Engine Setup
function initLanguage() {
    const langSelect = document.getElementById('lang-select');
    if (!langSelect) return;

    // Auto-detect browser language, defaulting to ko if applicable
    let defaultLang = 'en';
    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('ko')) {
        defaultLang = 'ko';
    }

    const savedLang = localStorage.getItem('lang') || defaultLang;
    langSelect.value = savedLang;
    currentLang = savedLang;

    updateUILanguage();
    updateDocumentMetadata(currentLang);

    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('lang', lang);
        currentLang = lang;
        updateUILanguage();
        updateDocumentMetadata(currentLang);
    });
}

// DOM SVG Injector
function renderInterfaceIcons() {
    document.querySelectorAll('.logo-icon-container').forEach(el => el.innerHTML = getIconSvg('layers'));
    document.querySelectorAll('.theme-icon-container').forEach(el => el.innerHTML = getIconSvg('sunMoon'));
    document.querySelectorAll('#add-more-btn .btn-icon-container').forEach(el => el.innerHTML = getIconSvg('plus'));
    document.querySelectorAll('#clear-queue-btn .btn-icon-container').forEach(el => el.innerHTML = getIconSvg('trash2'));
    document.querySelectorAll('.compress-icon-container').forEach(el => el.innerHTML = getIconSvg('zap'));
    document.querySelectorAll('.watermark-icon-container').forEach(el => el.innerHTML = getIconSvg('stamp'));
    document.querySelectorAll('.numbering-icon-container').forEach(el => el.innerHTML = getIconSvg('hash'));
    document.querySelectorAll('.scissors-icon-container').forEach(el => el.innerHTML = getIconSvg('scissors'));
    document.querySelectorAll('.files-icon-container').forEach(el => el.innerHTML = getIconSvg('files'));
    document.querySelectorAll('.fileText-icon-container').forEach(el => el.innerHTML = getIconSvg('fileText'));
    document.querySelectorAll('.lock-icon-container').forEach(el => el.innerHTML = getIconSvg('lock'));
    document.querySelectorAll('.modal-lock-icon-container').forEach(el => el.innerHTML = getIconSvg('lock', 'modal-icon'));
    document.querySelectorAll('.modal-security-lock-icon-container').forEach(el => el.innerHTML = getIconSvg('lock', 'modal-icon'));
    document.querySelectorAll('#toolbar-add-btn .btn-icon-container').forEach(el => el.innerHTML = getIconSvg('plus'));
    document.querySelectorAll('#batch-rotate-cw .btn-icon-container').forEach(el => el.innerHTML = getIconSvg('rotateCw'));
    document.querySelectorAll('#batch-reverse .btn-icon-container').forEach(el => el.innerHTML = getIconSvg('arrowUpDown'));
    document.querySelectorAll('#batch-sort .btn-icon-container').forEach(el => el.innerHTML = getIconSvg('sortAsc'));
    document.querySelectorAll('.fileUp-icon-container').forEach(el => el.innerHTML = getIconSvg('fileUp'));
    document.querySelectorAll('#browse-btn .btn-icon-container').forEach(el => el.innerHTML = getIconSvg('search'));
    document.querySelectorAll('#load-demo-btn .btn-icon-container').forEach(el => el.innerHTML = getIconSvg('sparkles'));
    document.querySelectorAll('.filters-icon-container').forEach(el => el.innerHTML = getIconSvg('sliders'));
}

// Loading Modal Control
let loadingStartTime = 0;
const MIN_LOADING_TIME = 800;

function showLoadingScreen(title = 'Processing...', text = '') {
    loadingStartTime = Date.now();
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingTitle = document.getElementById('loading-title');
    const loadingText = document.getElementById('loading-text');
    const loadingProgress = document.getElementById('loading-progress');

    if (loadingTitle) loadingTitle.textContent = title;
    if (loadingText) loadingText.textContent = text;
    if (loadingProgress) loadingProgress.style.width = '0%';
    if (loadingOverlay) loadingOverlay.classList.add('visible');

    triggerAdLoading();
}

async function hideLoadingScreen() {
    const elapsed = Date.now() - loadingStartTime;
    const remaining = MIN_LOADING_TIME - elapsed;
    if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining));
    }
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) loadingOverlay.classList.remove('visible');

    const adContainer = document.getElementById('loading-ad-container');
    if (adContainer) adContainer.classList.remove('expanded');
}

function showLoading(title, text) {
    showLoadingScreen(title, text);
}

async function hideLoading() {
    await hideLoadingScreen();
}

function updateLoading(title, text) {
    const loadingTitle = document.getElementById('loading-title');
    const loadingText = document.getElementById('loading-text');
    if (loadingTitle && title) loadingTitle.textContent = title;
    if (loadingText && text) loadingText.textContent = text;
}

function updateLoadingProgress(percent) {
    const progress = document.getElementById('loading-progress');
    if (progress) progress.style.width = percent + '%';
}

function triggerAdLoading() {
    const adContainer = document.getElementById('loading-ad-container');
    if (!adContainer) return;
    adContainer.classList.remove('expanded');
    setTimeout(() => {
        const modal = document.getElementById('loading-overlay');
        if (modal && modal.classList.contains('visible')) {
            adContainer.classList.add('expanded');
        }
    }, 1200);
}

// Toast Notifier
function showToast(type, text, duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconName = 'info';
    if (type === 'success') iconName = 'check';
    else if (type === 'error') iconName = 'alertTriangle';

    toast.innerHTML = `
        ${getIconSvg(iconName)}
        <span class="toast-message">${text}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, duration);
}

function showEmptyState(isEmpty) {
    const emptyState = document.getElementById('empty-state');
    const previewGrid = document.getElementById('preview-grid');
    if (emptyState && previewGrid) {
        if (isEmpty) {
            emptyState.classList.remove('hidden');
            previewGrid.classList.add('hidden');
        } else {
            emptyState.classList.add('hidden');
            previewGrid.classList.remove('hidden');
        }
    }
}

// Action Listeners Wiring
function wireActionListeners() {
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const addMoreBtn = document.getElementById('add-more-btn');
    const toolbarAddBtn = document.getElementById('toolbar-add-btn');
    const emptyState = document.getElementById('empty-state');

    // Consolidate trigger to run exactly ONCE per user interaction with stopPropagation/preventDefault
    const triggerUpload = (e) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (fileInput) fileInput.click();
    };

    if (browseBtn) {
        browseBtn.addEventListener('click', (e) => {
            triggerUpload(e);
        });
    }

    if (addMoreBtn) {
        addMoreBtn.addEventListener('click', (e) => {
            triggerUpload(e);
        });
    }

    if (toolbarAddBtn) {
        toolbarAddBtn.addEventListener('click', (e) => {
            triggerUpload(e);
        });
    }
    
    if (emptyState) {
        emptyState.addEventListener('click', (e) => {
            // Check closest to prevent multiple triggering if child buttons were clicked
            if (!e.target.closest('#load-demo-btn') && !e.target.closest('#browse-btn')) {
                triggerUpload(e);
            }
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            handleUploadedFiles(e.target.files);
            fileInput.value = ''; 
        });
    }

    document.getElementById('clear-queue-btn')?.addEventListener('click', clearQueue);

    const rangeInput = document.getElementById('extract-range');
    if (rangeInput) rangeInput.addEventListener('input', handleRangeInput);

    document.getElementById('batch-rotate-cw')?.addEventListener('click', () => rotateAll(90));
    document.getElementById('batch-reverse')?.addEventListener('click', reverseQueue);
    document.getElementById('batch-sort')?.addEventListener('click', sortQueueByName);

    document.getElementById('load-demo-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        loadSamplePDF();
    });
    document.getElementById('primary-action-btn')?.addEventListener('click', processPDFExport);

    document.getElementById('security-info-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const modal = document.getElementById('security-modal');
        if (modal) modal.classList.add('visible');
    });

    document.getElementById('modal-security-close')?.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const modal = document.getElementById('security-modal');
        if (modal) modal.classList.remove('visible');
    });

    document.getElementById('privacy-policy-trigger')?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const titleEl = document.getElementById('privacy-modal-title');
        const contentEl = document.getElementById('privacy-modal-body-content');
        const modal = document.getElementById('privacy-modal');
        
        if (titleEl) titleEl.textContent = t('privacy_modal_title');
        if (contentEl) contentEl.textContent = t('privacy_policy_text');
        if (modal) modal.classList.add('visible');
    });

    document.getElementById('modal-privacy-close')?.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const modal = document.getElementById('privacy-modal');
        if (modal) modal.classList.remove('visible');
    });
}

function initializeAccordion() {
    document.querySelectorAll('.setting-group-header').forEach(header => {
        header.addEventListener('click', (e) => {
            if (e.target.closest('.switch') || e.target.closest('input')) {
                return;
            }
            const checkbox = header.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });
}

// Collapsible switches handler
function setupSettingToggles() {
    const configs = [
        { checkboxId: 'toggle-watermark', bodyId: 'watermark-options' },
        { checkboxId: 'toggle-numbering', bodyId: 'numbering-options' },
        { checkboxId: 'toggle-compress', bodyId: 'compress-options' },
        { checkboxId: 'toggle-filters', bodyId: 'filters-options' },
        { checkboxId: 'toggle-strip-ocr', bodyId: null },
        { checkboxId: 'toggle-flatten-vector', bodyId: null },
        { checkboxId: 'toggle-grayscale', bodyId: null }
    ];

    configs.forEach(cfg => {
        const cb = document.getElementById(cfg.checkboxId);
        const body = cfg.bodyId ? document.getElementById(cfg.bodyId) : null;
        if (!cb) return;

        cb.addEventListener('change', () => {
            if (body) {
                if (cb.checked) {
                    body.classList.remove('collapsed');
                } else {
                    body.classList.add('collapsed');
                }
            }
            if (cfg.checkboxId === 'toggle-compress') {
                updateCompressionEstimate();
            }
        });
    });
}

function setupTabSwitcher() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');

            activeTab = target;
            updatePrimaryActionButtonText();
            renderQueueGrid();
        });
    });
}

function setupSplitModeSelector() {
    const radios = document.querySelectorAll('input[name="split-mode"]');
    const rangeWrapper = document.getElementById('extract-range-wrapper');
    const formatWrapper = document.getElementById('split-format-wrapper');
    if (!radios || !rangeWrapper || !formatWrapper) return;

    Array.from(radios).forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                splitMode = radio.value;
                if (splitMode === 'extract') {
                    rangeWrapper.classList.remove('collapsed');
                    formatWrapper.classList.add('collapsed');
                } else {
                    rangeWrapper.classList.add('collapsed');
                    formatWrapper.classList.remove('collapsed');
                }
                updatePrimaryActionButtonText();
                renderQueueGrid();
            }
        });
    });
}

function setupSliderListeners() {
    const opacitySlider = document.getElementById('watermark-opacity');
    const opacityVal = document.getElementById('watermark-opacity-value');
    if (opacitySlider && opacityVal) {
        opacitySlider.addEventListener('input', () => {
            opacityVal.textContent = Math.round(opacitySlider.value * 100) + '%';
        });
    }

    const sizeSlider = document.getElementById('watermark-size');
    const sizeVal = document.getElementById('watermark-size-value');
    if (sizeSlider && sizeVal) {
        sizeSlider.addEventListener('input', () => {
            sizeVal.textContent = sizeSlider.value + 'px';
        });
    }

    const angleSlider = document.getElementById('watermark-angle');
    const angleVal = document.getElementById('watermark-angle-value');
    if (angleSlider && angleVal) {
        angleSlider.addEventListener('input', () => {
            angleVal.textContent = angleSlider.value + '°';
        });
    }

    const colorPicker = document.getElementById('watermark-color');
    const colorHex = document.getElementById('watermark-color-hex');
    if (colorPicker && colorHex) {
        colorPicker.addEventListener('input', () => {
            colorHex.textContent = colorPicker.value.toUpperCase();
        });
    }

    const qualitySlider = document.getElementById('compress-quality');
    const qualityVal = document.getElementById('compress-quality-value');
    if (qualitySlider && qualityVal) {
        qualitySlider.addEventListener('input', () => {
            qualityVal.textContent = Math.round(qualitySlider.value * 100) + '%';
            updateCompressionEstimate();
        });
    }
}

function setupDragAndDrop() {
    const container = document.querySelector('.main-content');
    if (!container) return;

    window.addEventListener('dragover', (e) => {
        e.preventDefault();
        container.classList.add('drag-over');
    });

    window.addEventListener('dragleave', (e) => {
        e.preventDefault();
        if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
            container.classList.remove('drag-over');
        }
    });

    window.addEventListener('drop', (e) => {
        e.preventDefault();
        container.classList.remove('drag-over');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUploadedFiles(e.dataTransfer.files);
        }
    });
}

function setupSortable() {
    const grid = document.getElementById('preview-grid');
    if (!grid || typeof Sortable === 'undefined') return;

    new Sortable(grid, {
        animation: 180,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        onEnd: () => {
            const domIds = Array.from(grid.children).map(card => card.dataset.id);
            const newQueue = [];
            domIds.forEach(id => {
                const item = queue.find(q => q.id === id);
                if (item) newQueue.push(item);
            });
            queue = newQueue;

            updateCardLabels();
            if (activeTab === 'tab-split' && splitMode === 'extract') {
                handleRangeInput();
            }
        }
    });
}

function updateCardLabels() {
    const grid = document.getElementById('preview-grid');
    if (!grid) return;
    Array.from(grid.children).forEach((card, index) => {
        const badge = card.querySelector('.page-badge');
        if (badge) badge.textContent = '#' + (index + 1);
    });
}

// File loading and reading via FileReader
async function handleUploadedFiles(files) {
    if (!files || files.length === 0) return;
    
    showLoadingScreen(t('loading_files'));
    try {
        const validFiles = Array.from(files).filter(file => {
            const isPDF = file.type === 'application/pdf' || file.name.endsWith('.pdf');
            const isImg = file.type.startsWith('image/') && (
                file.name.endsWith('.png') || 
                file.name.endsWith('.jpg') || 
                file.name.endsWith('.jpeg')
            );
            return isPDF || isImg;
        });

        if (validFiles.length === 0) {
            showToast("error", t('toast_no_valid'));
            return;
        }

        const newFiles = validFiles.filter(file => !queue.some(q => 
            q.originalName === file.name 
        ));

        if (newFiles.length === 0 && validFiles.length > 0) {
            showToast("info", t('toast_skipped_dup'));
        }

        for (const file of newFiles) {
            const fileId = 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
            
            const arrayBuffer = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onprogress = (e) => {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded / e.total) * 100);
                        updateLoading(t('loading_files') + ` (${file.name})`, `${percent}%`);
                        updateLoadingProgress(percent);
                    }
                };
                reader.onload = () => resolve(new Uint8Array(reader.result)); // RAM optimization: store as Uint8Array directly
                reader.onerror = () => reject(new Error("File read error"));
                reader.readAsArrayBuffer(file);
            });
            
            uploadedFiles[fileId] = arrayBuffer;

            if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
                // Pass buffer directly - no copies!
                await parseAndAddPDFToQueue(arrayBuffer, file.name, fileId);
            } else if (file.type.startsWith('image/')) {
                await parseAndAddImageToQueue(file, fileId, arrayBuffer);
            }
        }

        renderQueueGrid();
        updateSummary();
    } catch (error) {
        console.error("Error handling uploaded files:", error);
        showToast("error", t('toast_load_fail'));
    } finally {
        await hideLoadingScreen();
    }
}

function sanitizePdfHeader(arrayBuffer) {
    const uint8 = new Uint8Array(arrayBuffer);
    const limit = Math.min(uint8.length, 1024);
    let startIndex = -1;
    for (let i = 0; i < limit - 4; i++) {
        if (uint8[i] === 37 && uint8[i+1] === 80 && uint8[i+2] === 68 && uint8[i+3] === 70 && uint8[i+4] === 45) {
            startIndex = i;
            break;
        }
    }
    
    if (startIndex > 0) {
        console.log(`PDF header found at index ${startIndex}. Trimming leading garbage bytes...`);
        return arrayBuffer.slice(startIndex);
    }
    return arrayBuffer;
}

async function parseAndAddPDFToQueue(arrayBuffer, fileName, fileId) {
    // 1. Sanitize Header
    arrayBuffer = sanitizePdfHeader(arrayBuffer);

    // 2. Automated Edit Restriction Removal Logic
    try {
        const tempDoc = await PDFDocument.load(arrayBuffer);
        const permissionFreeBytes = await tempDoc.save();
        arrayBuffer = permissionFreeBytes;
        uploadedFiles[fileId] = arrayBuffer; // update stored buffer with the permission-free copy
    } catch (e) {
        console.log("PDF requires password decryption:", e.message);
    }

    let pdfDoc = null; // PDF.js doc
    let userPassword = null;
    let success = false;

    // Load PDF-Lib document FIRST and cache it to prevent subsequent reload and detached ArrayBuffer crashes!
    let pdfLibDoc = null;
    while (!success) {
        try {
            updateLoading(t('loading_files') + ` (${fileName})`, "Parsing document...");
            // Load buffer directly - no copies!
            pdfLibDoc = await PDFDocument.load(arrayBuffer, { password: userPassword || undefined });
            // If PDF-Lib succeeds, load via PDFJS
            pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer, password: userPassword || undefined }).promise;
            success = true;
        } catch (error) {
            const isPasswordErr = error.name === 'PasswordException' || error.code === 1 || error.message.includes('password') || error.message.includes('decrypt');
            if (isPasswordErr) {
                userPassword = await getPdfPasswordModal(fileName, userPassword !== null);
                if (userPassword === null) {
                    delete uploadedFiles[fileId];
                    return;
                }
            } else {
                showToast("error", t("toast_parse_fail", fileName, error.message));
                delete uploadedFiles[fileId];
                return;
            }
        }
    }

    if (userPassword) {
        filePasswords[fileId] = userPassword; 
        showToast("success", t("toast_unlock_success"));
    }

    // Cache the loaded PDF-Lib document globally
    loadedDocsPdfLib[fileId] = pdfLibDoc;

    const pageCount = pdfDoc.numPages;
    const pendingPages = [];

    for (let i = 0; i < pageCount; i++) {
        const id = 'page_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
        const queueItem = {
            id,
            type: 'pdf',
            fileId,
            pageIndex: i,
            rotation: 0,
            thumbnailUrl: null, 
            originalName: fileName,
            originalPageNum: i + 1
        };
        queue.push(queueItem);
        pendingPages.push(queueItem);
    }

    for (const item of pendingPages) {
        try {
            const page = await pdfDoc.getPage(item.pageIndex + 1);
            const viewport = page.getViewport({ scale: 0.6 }); 
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({
                canvasContext: ctx,
                viewport: viewport
            }).promise;

            const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.85);
            item.thumbnailUrl = thumbnailUrl;

            // GPU RAM Cleanup: Reset canvas size immediately
            canvas.width = 0;
            canvas.height = 0;

            const card = document.getElementById(item.id);
            if (card) {
                const container = card.querySelector('.page-preview-container');
                if (container) {
                    container.innerHTML = `<img src="${thumbnailUrl}" class="page-thumbnail" alt="Page">`;
                }
            }
        } catch (err) {
            console.error(`Preview rendering aborted on ${fileName} page ${item.pageIndex}:`, err);
            const card = document.getElementById(item.id);
            if (card) {
                const container = card.querySelector('.page-preview-container');
                if (container) {
                    container.innerHTML = `
                        <div style="font-size:0.75rem; color:var(--danger-color); text-align:center; padding: 12px; display:flex; flex-direction:column; align-items:center; gap:4px;">
                            ${getIconSvg('alertTriangle')}
                            Render Fail
                        </div>
                    `;
                }
            }
        }
    }
    
    // Clean up pdf.js worker threads memory
    try {
        if (pdfDoc) pdfDoc.destroy();
    } catch(e) {}
}

async function parseAndAddImageToQueue(file, fileId, arrayBuffer) {
    const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });

    const id = 'page_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const queueItem = {
        id,
        type: 'image',
        fileId,
        rotation: 0,
        thumbnailUrl: dataUrl,
        originalName: file.name,
        mimeType: file.type,
        originalPageNum: 1
    };

    queue.push(queueItem);
}

// Processing Filters logic
function stripOcrTextFromContentStream(contents) {
    const textDecoder = new TextDecoder('latin1');
    const textEncoder = new TextEncoder();
    const contentStr = textDecoder.decode(contents);
    
    // Match and remove only BT...ET blocks containing "3 Tr" (invisible text rendering mode)
    // to target transparent OCR text paths while preserving all normal vector typography.
    const ocrBlockRegex = /BT(?:(?!BT|ET)[\s\S])*?3\s+Tr(?:(?!BT|ET)[\s\S])*?ET/g;
    const cleanedStr = contentStr.replace(ocrBlockRegex, '');
    
    return textEncoder.encode(cleanedStr);
}

function stripOcrTextFromPage(page) {
    try {
        const contents = page.node.Contents();
        if (!contents) return;

        if (contents instanceof PDFArray) {
            for (let i = 0; i < contents.size(); i++) {
                const stream = page.node.context.lookup(contents.get(i));
                if (stream instanceof PDFRawStream) {
                    const uncompressed = PDFLib.decodePDFRawStream(stream).getBytes();
                    const cleaned = stripOcrTextFromContentStream(uncompressed);
                    stream.contents = cleaned;
                    stream.dict.set(PDFName.of('Length'), PDFNumber.of(cleaned.length));
                    stream.dict.delete(PDFName.of('Filter'));
                }
            }
        } else {
            const stream = page.node.context.lookup(contents);
            if (stream instanceof PDFRawStream) {
                const uncompressed = PDFLib.decodePDFRawStream(stream).getBytes();
                const cleaned = stripOcrTextFromContentStream(uncompressed);
                stream.contents = cleaned;
                stream.dict.set(PDFName.of('Length'), PDFNumber.of(cleaned.length));
                stream.dict.delete(PDFName.of('Filter'));
            }
        }
    } catch (e) {
        console.warn("Failed to strip OCR stream from page:", e);
    }
}

function convertContentStreamToGrayscale(contents) {
    const textDecoder = new TextDecoder('latin1');
    const textEncoder = new TextEncoder();
    let contentStr = textDecoder.decode(contents);

    // Map RGB color operators (rg/RG) to Grayscale (g/G) operators
    contentStr = contentStr.replace(/(\d*\.?\d+)\s+(\d*\.?\d+)\s+(\d*\.?\d+)\s+(rg|RG)/g, (match, rStr, gStr, bStr, op) => {
        const r = parseFloat(rStr);
        const g = parseFloat(gStr);
        const b = parseFloat(bStr);
        const gray = (0.299 * r + 0.587 * g + 0.114 * b).toFixed(3);
        const newOp = op === 'rg' ? 'g' : 'G';
        return `${gray} ${newOp}`;
    });

    return textEncoder.encode(contentStr);
}

function convertPageToGrayscale(page) {
    try {
        const contents = page.node.Contents();
        if (!contents) return;

        if (contents instanceof PDFArray) {
            for (let i = 0; i < contents.size(); i++) {
                const stream = page.node.context.lookup(contents.get(i));
                if (stream instanceof PDFRawStream) {
                    const uncompressed = PDFLib.decodePDFRawStream(stream).getBytes();
                    const cleaned = convertContentStreamToGrayscale(uncompressed);
                    stream.contents = cleaned;
                    stream.dict.set(PDFName.of('Length'), PDFNumber.of(cleaned.length));
                    stream.dict.delete(PDFName.of('Filter'));
                }
            }
        } else {
            const stream = page.node.context.lookup(contents);
            if (stream instanceof PDFRawStream) {
                const uncompressed = PDFLib.decodePDFRawStream(stream).getBytes();
                const cleaned = convertContentStreamToGrayscale(uncompressed);
                stream.contents = cleaned;
                stream.dict.set(PDFName.of('Length'), PDFNumber.of(cleaned.length));
                stream.dict.delete(PDFName.of('Filter'));
            }
        }
    } catch (e) {
        console.warn("Failed to convert page color space to grayscale:", e);
    }
}

function flattenVectorInkContentStream(contents) {
    const textDecoder = new TextDecoder('latin1');
    const textEncoder = new TextEncoder();
    let contentStr = textDecoder.decode(contents);

    // Combine adjacent path draw operators (S/s followed by m)
    contentStr = contentStr.replace(/S\s+(\d*\.?\d+)\s+(\d*\.?\d+)\s+m/g, ' $1 $2 m');
    contentStr = contentStr.replace(/s\s+(\d*\.?\d+)\s+(\d*\.?\d+)\s+m/g, ' $1 $2 m');

    return textEncoder.encode(contentStr);
}

function flattenVectorInkOnPage(page) {
    try {
        const contents = page.node.Contents();
        if (!contents) return;

        if (contents instanceof PDFArray) {
            for (let i = 0; i < contents.size(); i++) {
                const stream = page.node.context.lookup(contents.get(i));
                if (stream instanceof PDFRawStream) {
                    const uncompressed = PDFLib.decodePDFRawStream(stream).getBytes();
                    const cleaned = flattenVectorInkContentStream(uncompressed);
                    stream.contents = cleaned;
                    stream.dict.set(PDFName.of('Length'), PDFNumber.of(cleaned.length));
                    stream.dict.delete(PDFName.of('Filter'));
                }
            }
        } else {
            const stream = page.node.context.lookup(contents);
            if (stream instanceof PDFRawStream) {
                const uncompressed = PDFLib.decodePDFRawStream(stream).getBytes();
                const cleaned = flattenVectorInkContentStream(uncompressed);
                stream.contents = cleaned;
                stream.dict.set(PDFName.of('Length'), PDFNumber.of(cleaned.length));
                stream.dict.delete(PDFName.of('Filter'));
            }
        }
    } catch (e) {
        console.warn("Failed to flatten vector ink paths:", e);
    }
}

// Re-compress embedded PDF Image XObject
async function recompressImageXObject(pdfDoc, xObject, quality, grayscaleEnabled, blurEnabled, canvasesToClean, objectUrlsToRevoke) {
    try {
        const filterObj = xObject.dict.get(PDFName.of('Filter'));
        let isDCT = false;
        if (filterObj instanceof PDFName) {
            isDCT = filterObj.decode() === 'DCTDecode';
        } else if (filterObj instanceof PDFArray) {
            isDCT = filterObj.asArray().some(f => f instanceof PDFName && f.decode() === 'DCTDecode');
        }
        
        if (!isDCT) return; 

        const bytes = xObject.contents; 
        
        const compressedBytes = await new Promise((resolve, reject) => {
            const blob = new Blob([bytes], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            if (objectUrlsToRevoke) objectUrlsToRevoke.push(url);
            
            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(url);
                
                let width = img.width;
                let height = img.height;
                const maxDim = quality >= 0.85 ? 2400 : 1200; // Smart Resolution Threshold
                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                const canvas = document.createElement('canvas');
                if (canvasesToClean) canvasesToClean.push(canvas);
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                
                if (grayscaleEnabled) {
                    ctx.filter = 'grayscale(100%)';
                }
                if (blurEnabled) {
                    const blurRadius = Math.max(0, (1.0 - quality) * 10);
                    if (blurRadius > 0) {
                        ctx.filter = grayscaleEnabled 
                            ? `grayscale(100%) blur(${blurRadius}px)` 
                            : `blur(${blurRadius}px)`;
                    }
                }
                
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((compressedBlob) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(new Uint8Array(reader.result));
                    reader.readAsArrayBuffer(compressedBlob);
                    canvas.width = 0;
                    canvas.height = 0; 
                }, 'image/jpeg', quality);
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error("Image decode failed"));
            };
            img.src = url;
        });

        xObject.contents = compressedBytes;
        xObject.dict.set(PDFName.of('Filter'), PDFName.of('DCTDecode'));
        xObject.dict.set(PDFName.of('Length'), PDFNumber.of(compressedBytes.length));
        xObject.dict.delete(PDFName.of('DecodeParms'));
    } catch (err) {
        console.warn("Failed to re-compress image XObject:", err);
    }
}

// Queue list rendering, single rotations & deletions
function renderQueueGrid() {
    const grid = document.getElementById('preview-grid');
    if (!grid) return;

    if (queue.length === 0) {
        showEmptyState(true);
        const cqBtn = document.getElementById('clear-queue-btn');
        const paBtn = document.getElementById('primary-action-btn');
        if (cqBtn) cqBtn.disabled = true;
        if (paBtn) paBtn.disabled = true;
        disableToolbarButtons(true);
        return;
    }

    showEmptyState(false);
    const cqBtn = document.getElementById('clear-queue-btn');
    const paBtn = document.getElementById('primary-action-btn');
    if (cqBtn) cqBtn.disabled = false;
    if (paBtn) paBtn.disabled = false;
    disableToolbarButtons(false);

    grid.innerHTML = '';

    const isRangeActive = activeTab === 'tab-split' && splitMode === 'extract';
    const matchedIndices = isRangeActive ? getMatchedIndices() : new Set();

    queue.forEach((item, index) => {
        const card = document.createElement('div');
        card.id = item.id;
        card.className = 'page-card';
        card.dataset.id = item.id;

        if (isRangeActive) {
            card.classList.add('has-extract-active');
            if (matchedIndices.has(index)) {
                card.classList.add('is-matched');
            }
        }

        let previewHtml = '';
        if (item.thumbnailUrl) {
            previewHtml = `<img src="${item.thumbnailUrl}" class="page-thumbnail rot-${item.rotation}" alt="Page ${index + 1}">`;
        } else {
            previewHtml = `
                <div class="rendering-placeholder">
                    <div class="skeleton-spinner"></div>
                    <span style="font-size:0.7rem; color:var(--text-muted)" data-i18n="rendering">Rendering...</span>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="page-badge">#${index + 1}</div>
            <div class="match-badge">
                ${getIconSvg('check')}
            </div>
            <div class="page-preview-container">
                ${previewHtml}
            </div>
            <div class="page-actions-overlay">
                <button class="action-round-btn btn-rotate-ccw" title="Rotate Counter-Clockwise">
                    ${getIconSvg('rotateCcw')}
                </button>
                <button class="action-round-btn btn-rotate-cw" title="Rotate Clockwise">
                    ${getIconSvg('rotateCw')}
                </button>
                <button class="action-round-btn btn-delete" title="Delete Page">
                    ${getIconSvg('trash2')}
                </button>
            </div>
            <div class="page-info-footer">
                <span class="info-file-name" title="${escapeHtml(item.originalName)}">${escapeHtml(item.originalName)}</span>
            </div>
        `;

        card.querySelector('.btn-rotate-ccw').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            rotatePage(item.id, -90);
        });

        card.querySelector('.btn-rotate-cw').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            rotatePage(item.id, 90);
        });

        card.querySelector('.btn-delete').addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            deletePage(item.id);
        });

        grid.appendChild(card);
    });
}

function rotatePage(itemId, angle) {
    const item = queue.find(q => q.id === itemId);
    if (item) {
        item.rotation = (item.rotation + angle + 360) % 360;
        const card = document.getElementById(itemId);
        if (card) {
            const img = card.querySelector('.page-thumbnail');
            if (img) {
                img.className = `page-thumbnail rot-${item.rotation}`;
            }
        }
    }
}

function deletePage(itemId) {
    const idx = queue.findIndex(q => q.id === itemId);
    if (idx !== -1) {
        queue.splice(idx, 1);
        renderQueueGrid();
        updateSummary();
        if (activeTab === 'tab-split' && splitMode === 'extract') {
            handleRangeInput();
        }
    }
}

async function rotateAll(angle) {
    if (queue.length === 0) return;
    showLoadingScreen(t('rotating_pipeline'));
    try {
        queue.forEach(item => {
            item.rotation = (item.rotation + angle + 360) % 360;
        });
        renderQueueGrid();
        showToast("success", t('toast_rotated_all'));
    } finally {
        await hideLoadingScreen();
    }
}

async function reverseQueue() {
    if (queue.length === 0) return;
    showLoadingScreen(t('reversing_layout'));
    try {
        queue.reverse();
        renderQueueGrid();
        showToast("success", t('toast_reversed'));
    } finally {
        await hideLoadingScreen();
    }
}

async function sortQueueByName() {
    if (queue.length === 0) return;
    showLoadingScreen(t('sorting_pipeline'));
    try {
        queue.sort((a, b) => {
            const nameA = a.originalName.toLowerCase();
            const nameB = b.originalName.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return a.originalPageNum - b.originalPageNum;
        });
        renderQueueGrid();
        showToast("success", t('toast_sorted'));
    } finally {
        await hideLoadingScreen();
    }
}

async function clearQueue() {
    if (queue.length === 0) return;
    if (confirm(t('toast_clear_confirm'))) {
        showLoadingScreen(t('purging_workspace'));
        try {
            queue = [];
            uploadedFiles = {};
            filePasswords = {};
            loadedDocsPdfLib = {}; // Clear global cache references
            const rangeInput = document.getElementById('extract-range');
            if (rangeInput) rangeInput.value = '';
            renderQueueGrid();
            updateSummary();
            showToast("info", t('toast_queue_cleared'));
        } finally {
            await hideLoadingScreen();
        }
    }
}

function handleRangeInput() {
    const rangeInput = document.getElementById('extract-range');
    const indicator = document.getElementById('range-status');
    if (!rangeInput || !indicator) return;

    if (!rangeInput.value || rangeInput.value.trim() === '') {
        indicator.className = 'range-status-indicator';
        indicator.innerHTML = `${getIconSvg('info')} <span data-i18n="range_indicator_empty">${t('range_indicator_empty')}</span>`;
        
        document.querySelectorAll('.page-card').forEach(card => {
            card.classList.remove('has-extract-active', 'is-matched');
        });
        return;
    }

    const matched = getMatchedIndices();

    if (matched.size === 0) {
        indicator.className = 'range-status-indicator invalid';
        indicator.innerHTML = `${getIconSvg('alertTriangle')} <span data-i18n="range_indicator_invalid">${t('range_indicator_invalid')}</span>`;
    } else {
        indicator.className = 'range-status-indicator valid';
        indicator.innerHTML = `${getIconSvg('check')} <span data-i18n="range_indicator_valid">${t('range_indicator_valid', matched.size, queue.length)}</span>`;
    }

    queue.forEach((item, index) => {
        const card = document.getElementById(item.id);
        if (card) {
            card.classList.add('has-extract-active');
            if (matched.has(index)) {
                card.classList.add('is-matched');
            } else {
                card.classList.remove('is-matched');
            }
        }
    });
}

function getMatchedIndices() {
    const rangeInput = document.getElementById('extract-range');
    const matched = new Set();
    if (!rangeInput || !rangeInput.value) return matched;

    const parts = rangeInput.value.split(',');
    const totalPages = queue.length;

    parts.forEach(part => {
        const trimmed = part.trim();
        if (/^\d+$/.test(trimmed)) {
            const pageNum = parseInt(trimmed, 10);
            if (pageNum >= 1 && pageNum <= totalPages) {
                matched.add(pageNum - 1);
            }
        } else if (/^\d+\s*-\s*\d+$/.test(trimmed)) {
            const bounds = trimmed.split('-');
            const start = parseInt(bounds[0].trim(), 10);
            const end = parseInt(bounds[1].trim(), 10);
            const min = Math.min(start, end);
            const max = Math.max(start, end);
            for (let i = min; i <= max; i++) {
                if (i >= 1 && i <= totalPages) {
                    matched.add(i - 1);
                }
            }
        }
    });

    return matched;
}

// Export pipeline trigger
async function processPDFExport() {
    if (queue.length === 0) {
        showToast("error", t('toast_empty_queue'));
        return;
    }

    // Telemetry: Push parameters inside window.dataLayer before compiling
    window.dataLayer = window.dataLayer || [];
    const watermarkOn = document.getElementById('toggle-watermark')?.checked ? 'on' : 'off';
    const numberingOn = document.getElementById('toggle-numbering')?.checked ? 'on' : 'off';
    const compressOn = document.getElementById('toggle-compress')?.checked ? 'on' : 'off';
    const grayscaleOn = document.getElementById('toggle-grayscale')?.checked ? 'on' : 'off';

    window.dataLayer.push({
        'event': 'pdf_conversion',
        'tool_metrics': {
            'active_tab': activeTab,
            'split_mode': activeTab === 'tab-split' ? splitMode : 'none',
            'export_format': activeTab === 'tab-split' && splitMode === 'all' ? (document.getElementById('split-format-select')?.value || 'pdf') : 'pdf',
            'filter_compress': compressOn,
            'filter_grayscale': grayscaleOn,
            'addon_watermark': watermarkOn,
            'addon_numbering': numberingOn,
            'queue_total_pages': queue.length
        }
    });

    console.time('PDF Processing');
    try {
        if (activeTab === 'tab-split') {
            if (splitMode === 'all') {
                await exportSplitAll();
            } else if (splitMode === 'extract') {
                const matched = getMatchedIndices();
                if (matched.size === 0) {
                    showToast("error", t('toast_invalid_range'));
                    return;
                }
                const selectedItems = Array.from(matched).map(idx => queue[idx]);
                await exportCombined(selectedItems, 'extracted.pdf');
            }
        } else {
            await exportCombined(queue, 'merged.pdf');
        }
    } finally {
        console.timeEnd('PDF Processing');
    }
}

// Compile combined PDF bytes
async function exportCombined(queueItems, defaultFileName) {
    showLoading(t('compiling_pdf'), t('unlocking_assembling', 0, queueItems.length));
    
    let outDoc = null;
    const totalItems = queueItems.length;
    const canvasesToClean = [];
    const objectUrlsToRevoke = [];

    try {
        outDoc = await PDFDocument.create();

        for (let idx = 0; idx < totalItems; idx++) {
            // UI Thread Yielding: Keep UI responsive
            await new Promise(resolve => setTimeout(resolve, 0));

            const item = queueItems[idx];
            updateLoading(t('unlocking_assembling', idx + 1, totalItems), item.originalName);
            updateLoadingProgress(Math.round((idx / totalItems) * 60)); 

            if (item.type === 'pdf') {
                if (!loadedDocsPdfLib[item.fileId]) {
                    const arrayBuffer = uploadedFiles[item.fileId];
                    const password = filePasswords[item.fileId] || "";
                    // Load buffer directly - no copies!
                    loadedDocsPdfLib[item.fileId] = await PDFDocument.load(arrayBuffer, { password });
                }
                const srcDoc = loadedDocsPdfLib[item.fileId];
                const [copiedPage] = await outDoc.copyPages(srcDoc, [item.pageIndex]);

                const originalRotation = copiedPage.getRotation().angle;
                copiedPage.setRotation(degrees((originalRotation + item.rotation) % 360));
                
                outDoc.addPage(copiedPage);
            } else if (item.type === 'image') {
                let arrayBuffer = uploadedFiles[item.fileId];
                const compressEnabled = document.getElementById('toggle-compress').checked;
                const quality = parseFloat(document.getElementById('compress-quality').value || '0.9');
                
                if (compressEnabled && quality < 1.0) {
                    arrayBuffer = await compressImageBuffer(arrayBuffer, item.mimeType, 1200, quality);
                }

                let embedImg;
                if ((!compressEnabled || quality === 1.0) && item.mimeType === 'image/png') {
                    embedImg = await outDoc.embedPng(arrayBuffer);
                } else {
                    embedImg = await outDoc.embedJpg(arrayBuffer);
                }

                // Fit to standard A4 (Letterbox)
                const A4_WIDTH = 595.28;
                const A4_HEIGHT = 841.89;
                const page = outDoc.addPage([A4_WIDTH, A4_HEIGHT]);

                const imgRatio = embedImg.width / embedImg.height;
                const pageRatio = A4_WIDTH / A4_HEIGHT;
                let width, height, x, y;

                if (imgRatio > pageRatio) {
                    width = A4_WIDTH;
                    height = A4_WIDTH / imgRatio;
                    x = 0;
                    y = (A4_HEIGHT - height) / 2;
                } else {
                    height = A4_HEIGHT;
                    width = A4_HEIGHT * imgRatio;
                    x = (A4_WIDTH - width) / 2;
                    y = 0;
                }

                page.drawImage(embedImg, { x, y, width, height });
                
                if (item.rotation !== 0) {
                    page.setRotation(degrees(item.rotation));
                }
            }
        }

        const pages = outDoc.getPages();
        const totalPages = pages.length;

        // Apply processing filters: OCR stripping, ink stroke flattening, grayscale
        const stripOcrEnabled = document.getElementById('toggle-strip-ocr')?.checked;
        const flattenVectorEnabled = document.getElementById('toggle-flatten-vector')?.checked;
        const grayscaleEnabled = document.getElementById('toggle-grayscale')?.checked;

        for (let i = 0; i < totalPages; i++) {
            await new Promise(resolve => setTimeout(resolve, 0)); // Yield
            const page = pages[i];
            if (stripOcrEnabled) {
                stripOcrTextFromPage(page);
            }
            if (flattenVectorEnabled) {
                flattenVectorInkOnPage(page);
            }
            if (grayscaleEnabled) {
                convertPageToGrayscale(page);
            }
        }

        // Apply smart embedded image compression (OR grayscale image colorspace replacement)
        const compressEnabled = document.getElementById('toggle-compress').checked;
        const quality = parseFloat(document.getElementById('compress-quality').value || '0.9');
        
        if ((compressEnabled && quality < 1.0) || grayscaleEnabled) {
            updateLoading(t('compiling_pdf'), "Optimizing embedded image elements...");
            for (let i = 0; i < totalPages; i++) {
                await new Promise(resolve => setTimeout(resolve, 0)); // Yield
                const page = pages[i];
                const resources = page.node.Resources();
                if (resources) {
                    const xObjects = resources.get(PDFName.of('XObject'));
                    if (xObjects instanceof PDFDict) {
                        for (const [name, ref] of xObjects.entries()) {
                            const xObject = outDoc.context.lookup(ref);
                            if (xObject instanceof PDFRawStream) {
                                const subtype = xObject.dict.get(PDFName.of('Subtype'));
                                if (subtype instanceof PDFName && subtype.decode() === 'Image') {
                                    await recompressImageXObject(outDoc, xObject, compressEnabled ? quality : 1.0, grayscaleEnabled, false, canvasesToClean, objectUrlsToRevoke);
                                }
                            }
                        }
                    }
                }
            }
        }

        // Stamp Watermark
        const isWatermarkEnabled = document.getElementById('toggle-watermark').checked;
        if (isWatermarkEnabled) {
            updateLoading(t('stamping_watermark'), t('stamping_watermark_sub'));
            const text = document.getElementById('watermark-text').value || "CONFIDENTIAL";
            const font = await outDoc.embedFont(StandardFonts.HelveticaBold);
            const size = parseInt(document.getElementById('watermark-size').value, 10) || 48;
            const colorHex = document.getElementById('watermark-color').value || '#FF0000';
            const opacity = parseFloat(document.getElementById('watermark-opacity').value) || 0.3;
            const angle = parseInt(document.getElementById('watermark-angle').value, 10) || -45;

            const color = hexToRgbColor(colorHex);

            for (let i = 0; i < totalPages; i++) {
                await new Promise(resolve => setTimeout(resolve, 0)); // Yield
                updateLoadingProgress(60 + Math.round((i / totalPages) * 15)); 
                const page = pages[i];
                const { width, height } = page.getSize();
                
                const textWidth = font.widthOfTextAtSize(text, size);
                const textHeight = size;

                const angleRad = (angle * Math.PI) / 180;
                const cos = Math.cos(angleRad);
                const sin = Math.sin(angleRad);
                const x = width / 2 - (textWidth / 2) * cos + (textHeight / 2) * sin;
                const y = height / 2 - (textWidth / 2) * sin - (textHeight / 2) * cos;

                page.drawText(text, {
                    x, y, size, font, color, opacity, rotate: degrees(angle)
                });
            }
        }

        // Stamp Page Numbering
        const isNumberingEnabled = document.getElementById('toggle-numbering').checked;
        if (isNumberingEnabled) {
            updateLoading(t('numbering_pages'), t('numbering_pages_sub'));
            const style = document.getElementById('numbering-style').value;
            const position = document.getElementById('numbering-position').value;

            for (let i = 0; i < totalPages; i++) {
                await new Promise(resolve => setTimeout(resolve, 0)); // Yield
                updateLoadingProgress(75 + Math.round((i / totalPages) * 15)); 
                const page = pages[i];
                const { width, height } = page.getSize();
                
                let stampText = `${i + 1}`;
                if (style === 'page-of') {
                    stampText = currentLang === 'ko' 
                        ? `${totalPages}페이지 중 ${i + 1}페이지`
                        : `Page ${i + 1} of ${totalPages}`;
                }
                
                const textImgData = await renderTextToImage(stampText, 10, '#333333', canvasesToClean, objectUrlsToRevoke);
                const embedImg = await outDoc.embedPng(textImgData.buffer);
                
                const textWidth = textImgData.width;
                const textHeight = textImgData.height;

                const rotationAngle = page.getRotation().angle;
                const isRotated = rotationAngle === 90 || rotationAngle === 270;
                const pageWidth = isRotated ? height : width;
                const pageHeight = isRotated ? width : height;

                let x = 0, y = 0;
                if (position === 'bottom-center') {
                    x = (pageWidth - textWidth) / 2;
                    y = 25;
                } else if (position === 'bottom-right') {
                    x = pageWidth - textWidth - 30;
                    y = 25;
                } else if (position === 'top-right') {
                    x = pageWidth - textWidth - 30;
                    y = pageHeight - 30;
                }

                if (rotationAngle === 90) {
                    page.drawImage(embedImg, {
                        x: y, y: width - x - textHeight, width: textWidth, height: textHeight, rotate: degrees(-90)
                    });
                } else if (rotationAngle === 180) {
                    page.drawImage(embedImg, {
                        x: pageWidth - x - textWidth, y: pageHeight - y - textHeight, width: textWidth, height: textHeight, rotate: degrees(180)
                    });
                } else if (rotationAngle === 270) {
                    page.drawImage(embedImg, {
                        x: height - y - textHeight, y: x, width: textWidth, height: textHeight, rotate: degrees(90)
                    });
                } else {
                    page.drawImage(embedImg, {
                        x, y, width: textWidth, height: textHeight
                    });
                }
            }
        }

        updateLoading(t('saving_final'), t('saving_final_sub'));
        updateLoadingProgress(96);

        // White-Label Metadata Override
        outDoc.setProducer("SidePDF (https://pdf.sidelabs.net/)");
        outDoc.setCreator("SidePDF (https://pdf.sidelabs.net/)");
        outDoc.setAuthor("SidePDF (https://pdf.sidelabs.net/)");

        // Merge speed optimization: useObjectStreams: false unless compressEnabled is true
        const finalBytes = await outDoc.save({ useObjectStreams: compressEnabled });
        
        downloadBlob(new Blob([finalBytes], { type: 'application/pdf' }), defaultFileName);
        
        let successMessage = t('toast_merge_success');
        if (activeTab === 'tab-split' && splitMode === 'extract') {
            successMessage = t('toast_extract_success');
        } else if (isNumberingEnabled) {
            successMessage = currentLang === 'ko'
                ? "페이지 번호가 적용되어 성공적으로 내보내졌습니다."
                : "Page numbering applied and exported successfully.";
        }
        showToast("success", successMessage);
    } catch (err) {
        console.error("Assembly compilation pipeline failed:", err);
        showToast("error", t('toast_compile_fail', err.message));
    } finally {
        // Immediate RAM Optimization & Garbage Collection
        if (canvasesToClean) {
            canvasesToClean.forEach(c => {
                try {
                    c.width = 0;
                    c.height = 0;
                    c.remove();
                } catch (e) {}
            });
        }
        if (objectUrlsToRevoke) {
            objectUrlsToRevoke.forEach(url => {
                try {
                    URL.revokeObjectURL(url);
                } catch (e) {}
            });
        }
        // Do not purge global loadedDocsPdfLib cache here to keep subsequent merges instant
        outDoc = null;
        await hideLoading();
    }
}

// Export split PDF zip
async function exportSplitAll() {
    showLoading(t('splitting_document'), t('splitting_document_sub'));
    
    // Detached Safeguard: declare variables for RAM cleanup
    const loadedDocsPdfJs = {};
    const totalItems = queue.length;
    const canvasesToClean = [];
    const objectUrlsToRevoke = [];
    
    const formatSelect = document.getElementById('split-format-select');
    const format = formatSelect ? formatSelect.value : 'pdf'; 

    try {
        const zip = new JSZip();

        for (let idx = 0; idx < totalItems; idx++) {
            // UI Thread Yielding: Keep UI responsive
            await new Promise(resolve => setTimeout(resolve, 0));

            const item = queue[idx];
            updateLoading(t('splitting_document'), item.originalName);

            const paddedNum = String(idx + 1).padStart(3, '0');

            if (format === 'pdf') {
                const singleDoc = await PDFDocument.create();

                if (item.type === 'pdf') {
                    if (!loadedDocsPdfLib[item.fileId]) {
                        const buf = uploadedFiles[item.fileId];
                        const password = filePasswords[item.fileId] || "";
                        // Load buffer directly - no copies!
                        loadedDocsPdfLib[item.fileId] = await PDFDocument.load(buf, { password });
                    }
                    const srcDoc = loadedDocsPdfLib[item.fileId];
                    const [copiedPage] = await singleDoc.copyPages(srcDoc, [item.pageIndex]);

                    singleDoc.addPage(copiedPage);

                    const originalRotation = copiedPage.getRotation().angle;
                    const addedPage = singleDoc.getPages()[0];
                    addedPage.setRotation(degrees((originalRotation + item.rotation) % 360));
                } else if (item.type === 'image') {
                    let buf = uploadedFiles[item.fileId];
                    const compressEnabled = document.getElementById('toggle-compress').checked;
                    const quality = parseFloat(document.getElementById('compress-quality').value || '0.9');
                    
                    if (compressEnabled && quality < 1.0) {
                        buf = await compressImageBuffer(buf, item.mimeType, 1200, quality);
                    }

                    let embedImg;
                    if ((!compressEnabled || quality === 1.0) && item.mimeType === 'image/png') {
                        embedImg = await singleDoc.embedPng(buf);
                    } else {
                        embedImg = await singleDoc.embedJpg(buf);
                    }

                    // Fit to standard A4 (Letterbox)
                    const A4_WIDTH = 595.28;
                    const A4_HEIGHT = 841.89;
                    const page = singleDoc.addPage([A4_WIDTH, A4_HEIGHT]);

                    const imgRatio = embedImg.width / embedImg.height;
                    const pageRatio = A4_WIDTH / A4_HEIGHT;
                    let width, height, x, y;

                    if (imgRatio > pageRatio) {
                        width = A4_WIDTH;
                        height = A4_WIDTH / imgRatio;
                        x = 0;
                        y = (A4_HEIGHT - height) / 2;
                    } else {
                        height = A4_HEIGHT;
                        width = A4_HEIGHT * imgRatio;
                        x = (A4_WIDTH - width) / 2;
                        y = 0;
                    }

                    page.drawImage(embedImg, { x, y, width, height });

                    if (item.rotation !== 0) {
                        page.setRotation(degrees(item.rotation));
                    }
                }

                const pages = singleDoc.getPages();
                const page = pages[0];

                // Apply processing filters: OCR stripping, ink stroke flattening, grayscale
                const stripOcrEnabled = document.getElementById('toggle-strip-ocr')?.checked;
                const flattenVectorEnabled = document.getElementById('toggle-flatten-vector')?.checked;
                const grayscaleEnabled = document.getElementById('toggle-grayscale')?.checked;

                if (stripOcrEnabled) {
                    stripOcrTextFromPage(page);
                }
                if (flattenVectorEnabled) {
                    flattenVectorInkOnPage(page);
                }
                if (grayscaleEnabled) {
                    convertPageToGrayscale(page);
                }

                // Apply smart image compression / grayscale colorspace replacement on split page
                const compressEnabled = document.getElementById('toggle-compress').checked;
                const quality = parseFloat(document.getElementById('compress-quality').value || '0.9');
                
                if ((compressEnabled && quality < 1.0) || grayscaleEnabled) {
                    const resources = page.node.Resources();
                    if (resources) {
                        const xObjects = resources.get(PDFName.of('XObject'));
                        if (xObjects instanceof PDFDict) {
                            for (const [name, ref] of xObjects.entries()) {
                                const xObject = singleDoc.context.lookup(ref);
                                if (xObject instanceof PDFRawStream) {
                                    const subtype = xObject.dict.get(PDFName.of('Subtype'));
                                    if (subtype instanceof PDFName && subtype.decode() === 'Image') {
                                        await recompressImageXObject(singleDoc, xObject, compressEnabled ? quality : 1.0, grayscaleEnabled, false, canvasesToClean, objectUrlsToRevoke);
                                    }
                                }
                            }
                        }
                    }
                }

                // White-Label Metadata Override
                singleDoc.setProducer("SidePDF (https://pdf.sidelabs.net/)");
                singleDoc.setCreator("SidePDF (https://pdf.sidelabs.net/)");
                singleDoc.setAuthor("SidePDF (https://pdf.sidelabs.net/)");

                // Merge speed optimization: useObjectStreams: false unless compressEnabled is true
                const pageBytes = await singleDoc.save({ useObjectStreams: compressEnabled });
                zip.file(`split_page_${paddedNum}.pdf`, pageBytes);
            } else {
                const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
                const fileExt = format === 'png' ? 'png' : 'jpg';

                if (item.type === 'pdf') {
                    if (!loadedDocsPdfJs[item.fileId]) {
                        const buf = uploadedFiles[item.fileId];
                        const password = filePasswords[item.fileId] || "";
                        // Load buffer directly - no copies!
                        loadedDocsPdfJs[item.fileId] = await pdfjsLib.getDocument({ data: buf, password }).promise;
                    }
                    const pdfDocJs = loadedDocsPdfJs[item.fileId];
                    const page = await pdfDocJs.getPage(item.pageIndex + 1);

                    // Render at high-resolution 2.0 scale
                    const scale = 2.0;
                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement('canvas');
                    if (canvasesToClean) canvasesToClean.push(canvas);
                    const ctx = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    await page.render({
                        canvasContext: ctx,
                        viewport: viewport
                    }).promise;

                    // Convert to image data URL and pack asynchronously
                    const dataUrl = canvas.toDataURL(mimeType, 0.92);
                    const imgBuffer = await dataURItoArrayBuffer(dataUrl);
                    zip.file(`split_page_${paddedNum}.${fileExt}`, imgBuffer);

                    // GPU RAM Cleanup: Reset canvas size immediately
                    canvas.width = 0;
                    canvas.height = 0;
                } else if (item.type === 'image') {
                    const buf = uploadedFiles[item.fileId];
                    zip.file(`split_page_${paddedNum}.${fileExt}`, buf);
                }
            }
        }

        updateLoading(t('packaging_zip'), t('packaging_zip_sub'));
        updateLoadingProgress(92);

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        downloadBlob(zipBlob, format === 'pdf' ? 'split_pages.zip' : `split_images_${format}.zip`);
        showToast("success", t('toast_zip_success'));
    } catch (err) {
        console.error("Split compilation failed:", err);
        showToast("error", t('toast_split_fail', err.message));
    } finally {
        // Immediate RAM Optimization & Garbage Collection
        if (canvasesToClean) {
            canvasesToClean.forEach(c => {
                try {
                    c.width = 0;
                    c.height = 0;
                    c.remove();
                } catch (e) {}
            });
        }
        if (objectUrlsToRevoke) {
            objectUrlsToRevoke.forEach(url => {
                try {
                    URL.revokeObjectURL(url);
                } catch (e) {}
            });
        }
        if (loadedDocsPdfJs) {
            Object.keys(loadedDocsPdfJs).forEach(k => {
                try {
                    if (loadedDocsPdfJs[k]) loadedDocsPdfJs[k].destroy();
                } catch(e) {}
                loadedDocsPdfJs[k] = null;
                delete loadedDocsPdfJs[k];
            });
        }
        await hideLoading();
    }
}

// Onboarding Sandbox Generator
async function loadSamplePDF() {
    showLoading(t('generating_sample'), t('generating_sample_sub'));
    try {
        const { PDFDocument, rgb, StandardFonts } = PDFLib;
        const pdfDoc = await PDFDocument.create();

        const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const page1 = pdfDoc.addPage([600, 800]);
        page1.drawRectangle({
            x: 0, y: 740, width: 600, height: 60, color: rgb(0.39, 0.4, 0.94) 
        });
        page1.drawText("SidePDF Suite — Demonstration", {
            x: 30, y: 760, size: 18, font: helveticaBold, color: rgb(1, 1, 1)
        });
        page1.drawText("Welcome to our client-side sandbox!", {
            x: 30, y: 670, size: 24, font: helveticaBold, color: rgb(0.08, 0.12, 0.18)
        });
        page1.drawText(
            "This document was procedurally generated inside your browser.\n" +
            "It demonstrates our highly performance-optimized local compilation flow.\n\n" +
            "Interactive exercises to explore:\n" +
            " 1. Arrange & Reorder: Drag this card to other indices in the grid.\n" +
            " 2. Dynamic Rotation: Hover this card, hit clockwise or counter-clockwise.\n" +
            " 3. Custom Watermarks: Enable watermark in sidebar & toggle opacity/rotation.\n" +
            " 4. Dynamic Numbering: Try numbering bottom-right or bottom-center on export.",
            {
                x: 30, y: 440, size: 13, font: helvetica, color: rgb(0.25, 0.3, 0.4), lineHeight: 22
            }
        );

        const page2 = pdfDoc.addPage([600, 800]);
        page2.drawRectangle({
            x: 0, y: 740, width: 600, height: 60, color: rgb(0.06, 0.73, 0.51) 
        });
        page2.drawText("Page 2 — Local Vector Art Sandbox", {
            x: 30, y: 760, size: 18, font: helveticaBold, color: rgb(1, 1, 1)
        });
        page2.drawText("Color Overlap & Translucency Matrix", {
            x: 30, y: 670, size: 20, font: helveticaBold, color: rgb(0.08, 0.12, 0.18)
        });
        
        page2.drawCircle({ x: 300, y: 420, radius: 100, color: rgb(0.93, 0.27, 0.27), opacity: 0.65 });
        page2.drawCircle({ x: 230, y: 320, radius: 80, color: rgb(0.39, 0.4, 0.94), opacity: 0.65 });
        page2.drawCircle({ x: 370, y: 320, radius: 80, color: rgb(0.06, 0.73, 0.51), opacity: 0.65 });

        page2.drawText("All vectors scale perfectly without pixel degradation.", {
            x: 130, y: 160, size: 12, font: helvetica, color: rgb(0.3, 0.4, 0.5)
        });

        const page3 = pdfDoc.addPage([600, 800]);
        page3.drawRectangle({
            x: 0, y: 740, width: 600, height: 60, color: rgb(0.93, 0.27, 0.27) 
        });
        page3.drawText("Page 3 — Technical Specifications", {
            x: 30, y: 760, size: 18, font: helveticaBold, color: rgb(1, 1, 1)
        });

        page3.drawText("Architecture Spec", { x: 50, y: 670, size: 14, font: helveticaBold, color: rgb(0.08, 0.12, 0.18) });
        page3.drawText("Evaluation", { x: 350, y: 670, size: 14, font: helveticaBold, color: rgb(0.06, 0.73, 0.51) });

        const specs = [
            { name: "Browser Processing Latency", value: "Sub-second (< 200ms compiled)" },
            { name: "Server Network Ingress", value: "Zero (100% Offline client-side)" },
            { name: "Visual Grid Sorting Logic", value: "SortableJS integration" },
            { name: "Watermark Stamp Diagonal", value: "Vector calculated centered text" }
        ];

        let currY = 620;
        for (const spec of specs) {
            page3.drawText(spec.name, { x: 50, y: currY, size: 12, font: helvetica, color: rgb(0.2, 0.3, 0.4) });
            page3.drawText(spec.value, { x: 350, y: currY, size: 12, font: helveticaBold, color: rgb(0.06, 0.73, 0.51) });
            currY -= 40;
        }

        const pdfBytes = await pdfDoc.save();
        const fileId = 'file_sample_' + Date.now();
        uploadedFiles[fileId] = pdfBytes; // Store directly as Uint8Array
        
        await parseAndAddPDFToQueue(pdfBytes, "sample_sandbox.pdf", fileId); // Pass buffer directly
        
        renderQueueGrid();
        updateSummary();
        showToast("success", t('toast_demo_loaded'));
    } catch (err) {
        console.error("Demo PDF generation failed:", err);
        showToast("error", t('toast_compile_fail', err.message));
    } finally {
        await hideLoading();
    }
}

// Capacity Prediction Size Estimator
function updateCompressionEstimate() {
    const qualitySlider = document.getElementById('compress-quality');
    const quality = qualitySlider ? parseFloat(qualitySlider.value) : 0.9;
    const compressEnabled = document.getElementById('toggle-compress')?.checked;
    const estimateText = document.getElementById('compress-estimate-text');
    const compressWarning = document.getElementById('compress-warning');
    
    if (compressWarning) {
        if (compressEnabled && quality <= 0.75) {
            compressWarning.classList.remove('hidden');
        } else {
            compressWarning.classList.add('hidden');
        }
    }
    
    if (!estimateText) return;
    
    if (!compressEnabled) {
        estimateText.textContent = currentLang === 'ko' ? "압축 비활성화됨" : "Compression Disabled";
        return;
    }

    let totalEstimatedBytes = 0;
    const filePagesCount = {};
    queue.forEach(item => {
        filePagesCount[item.fileId] = (filePagesCount[item.fileId] || 0) + 1;
    });

    queue.forEach(item => {
        const fileId = item.fileId;
        const originalBytes = uploadedFiles[fileId]?.byteLength || 200000;

        if (item.type === 'pdf') {
            if (quality >= 1.0) {
                const pageCount = filePagesCount[fileId] || 1;
                totalEstimatedBytes += originalBytes / pageCount;
            } else {
                const pageCount = filePagesCount[fileId] || 1;
                const pageOriginalBytes = originalBytes / pageCount;
                
                const fixedBaseline = Math.min(pageOriginalBytes, Math.max(30000, pageOriginalBytes * 0.20));
                const compressible = Math.max(0, pageOriginalBytes - fixedBaseline);
                
                const qualityFactor = 0.15 + 0.85 * Math.pow(quality, 2);
                
                totalEstimatedBytes += fixedBaseline + (compressible * qualityFactor);
            }
        } else if (item.type === 'image') {
            if (quality >= 1.0) {
                totalEstimatedBytes += originalBytes;
            } else {
                const fixedBaseline = 8192;
                const compressible = Math.max(0, originalBytes - fixedBaseline);
                
                const isPNG = item.mimeType === 'image/png' || item.originalName.toLowerCase().endsWith('.png');
                const efficiency = isPNG ? 0.3 : 0.85;
                
                const qualityFactor = 0.15 + 0.85 * Math.pow(quality, 2);
                
                totalEstimatedBytes += fixedBaseline + (compressible * efficiency * qualityFactor);
            }
        }
    });

    const kb = totalEstimatedBytes / 1024;
    const mb = kb / 1024;
    const sizeStr = mb >= 1 ? `${mb.toFixed(2)} MB` : `${kb.toFixed(0)} KB`;
    
    estimateText.textContent = currentLang === 'ko' 
        ? `예상 파일 크기: ~ ${sizeStr}`
        : `Estimated Size: ~ ${sizeStr}`;
}

function updateSummary() {
    const fileIds = new Set(queue.map(item => item.fileId));
    const countFiles = document.getElementById('queue-count-files');
    const countPages = document.getElementById('queue-count-pages');
    const totalBadge = document.getElementById('total-pages-badge');

    const totalFiles = fileIds.size;
    const totalPages = queue.length;

    if (countFiles) {
        countFiles.textContent = currentLang === 'ko' 
            ? `파일 ${totalFiles}개` 
            : `${totalFiles} file${totalFiles !== 1 ? 's' : ''}`;
    }
    if (countPages) {
        countPages.textContent = currentLang === 'ko'
            ? `페이지 ${totalPages}개`
            : `${totalPages} page${totalPages !== 1 ? 's' : ''}`;
    }
    if (totalBadge) {
        totalBadge.textContent = String(totalPages);
    }
    updateCompressionEstimate();
}

function updatePrimaryActionButtonText() {
    const btn = document.getElementById('primary-action-btn');
    if (!btn) return;

    const span = btn.querySelector('[data-i18n]');
    const iconContainer = btn.querySelector('.btn-icon-container') || btn;

    if (activeTab === 'tab-merge') {
        iconContainer.innerHTML = getIconSvg('download');
        if (span) span.textContent = t('btn_compile_export');
    } else if (activeTab === 'tab-split') {
        if (splitMode === 'all') {
            iconContainer.innerHTML = getIconSvg('scissors');
            if (span) span.textContent = t('btn_split_download');
        } else if (splitMode === 'extract') {
            iconContainer.innerHTML = getIconSvg('fileText');
            if (span) span.textContent = t('btn_extract_export');
        }
    }
}

function disableToolbarButtons(disable) {
    const btnCw = document.getElementById('batch-rotate-cw');
    const btnRev = document.getElementById('batch-reverse');
    const btnSort = document.getElementById('batch-sort');
    if (btnCw) btnCw.disabled = disable;
    if (btnRev) btnRev.disabled = disable;
    if (btnSort) btnSort.disabled = disable;
}

// Password Unlock modal logic
async function getPdfPasswordModal(fileName, isRetry) {
    return new Promise((resolve) => {
        const modal = document.getElementById('password-modal');
        const input = document.getElementById('modal-password-input');
        const submitBtn = document.getElementById('modal-password-submit');
        const cancelBtn = document.getElementById('modal-password-cancel');
        const title = document.getElementById('modal-password-title');
        const errorMsg = document.getElementById('modal-password-error');

        if (title) title.innerHTML = `${getIconSvg('lock', 'modal-icon')} ${t('unlock_pdf_title')} <span class="file-name-highlight">(${escapeHtml(fileName)})</span>`;
        if (input) input.value = '';

        if (errorMsg) {
            if (isRetry) errorMsg.classList.remove('hidden');
            else errorMsg.classList.add('hidden');
        }

        if (modal) modal.classList.add('visible');
        if (input) input.focus();

        const cleanup = () => {
            if (submitBtn) submitBtn.removeEventListener('click', handleSubmit);
            if (cancelBtn) cancelBtn.removeEventListener('click', handleCancel);
            if (input) input.removeEventListener('keydown', handleKeyDown);
            if (modal) modal.classList.remove('visible');
        };

        const handleSubmit = () => {
            const pw = input ? input.value : '';
            cleanup();
            resolve(pw);
        };

        const handleCancel = () => {
            cleanup();
            resolve(null);
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Enter') handleSubmit();
            else if (e.key === 'Escape') handleCancel();
        };

        if (submitBtn) submitBtn.addEventListener('click', handleSubmit);
        if (cancelBtn) cancelBtn.addEventListener('click', handleCancel);
        if (input) input.addEventListener('keydown', handleKeyDown);
    });
}

function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function hexToRgbColor(hex) {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;
    return PDFLib.rgb(r, g, b);
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function dataURItoArrayBuffer(dataURI) {
    if (!dataURI || !dataURI.includes(',')) {
        throw new Error("Invalid DataURI structure passed to dataURItoArrayBuffer");
    }
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return ab;
}

async function renderTextToImage(text, fontSize = 10, colorHex = '#333333', canvasesToClean, objectUrlsToRevoke) {
    const scale = 2.5; 
    const canvas = document.createElement('canvas');
    if (canvasesToClean) canvasesToClean.push(canvas);
    const ctx = canvas.getContext('2d');
    
    ctx.font = `${fontSize * scale}px "Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`;
    const metrics = ctx.measureText(text);
    
    const textWidth = Math.ceil(metrics.width);
    const textHeight = Math.ceil(fontSize * 1.5 * scale);
    
    canvas.width = textWidth + 10;
    canvas.height = textHeight + 10;
    
    ctx.font = `${fontSize * scale}px "Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif`;
    ctx.fillStyle = colorHex;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 5, canvas.height / 2);
    
    const pngDataUrl = canvas.toDataURL('image/png');
    const buffer = dataURItoArrayBuffer(pngDataUrl);
    
    // GPU memory release
    canvas.width = 0;
    canvas.height = 0;
    
    return {
        buffer,
        width: canvas.width / scale,
        height: canvas.height / scale
    };
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
    renderInterfaceIcons();
    initTheme();
    initLanguage();
    initializeAccordion();
    setupTabSwitcher();
    setupSplitModeSelector();
    setupSettingToggles();
    setupSliderListeners();
    setupSortable();
    setupDragAndDrop();
    wireActionListeners();
    updateSummary();
    updatePrimaryActionButtonText();
});
