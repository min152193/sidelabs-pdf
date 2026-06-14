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
    sliders: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/></svg>`,
    aspectRatio: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="6" rx="2" ry="2"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="18"/></svg>`
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
let loadedDocsPdfLib = {}; // Global PDFDocument cache to prevent reloading and detached ArrayBuffer crashes
let generatedObjectUrls = [];
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
        terms_link: "Terms of Service",
        terms_modal_title: "Terms of Service",
        terms_policy_text: `SidePDF Terms of Service\n\n1. Acceptance of Terms\nBy accessing and using SidePDF (the "Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.\n\n2. Use of Service\nSidePDF is a client-side PDF utility suite. You may use it for personal or commercial document processing. Since all processing runs locally inside your browser, you are responsible for maintaining copies of your files.\n\n3. Disclaimer of Warranties\nThe Service is provided 'as is' without warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, secure, or error-free.\n\n4. Limitation of Liability\nIn no event shall SidePDF or its administrators be liable for any direct, indirect, incidental, or consequential damages arising out of your use of the Service.\n\n5. Governing Law\nThese terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the Service administrators operate.\n\nContact: contact@sidelabs.net`,
        about_link: "About Us",
        about_modal_title: "About Us",
        about_policy_text: `About SidePDF\n\nSidePDF is a modern, serverless, and 100% client-side PDF utility suite developed by SideLabs.\n\nOur mission is to provide secure, high-performance, and private document processing tools completely inside the user's browser container. By leveraging WebAssembly and modern web APIs, we eliminate file transfers and server uploads, ensuring that your sensitive information never leaves your local machine.\n\nSideLabs specializes in building zero-trust, serverless utilities that respect user privacy and optimize client-side computational capabilities.\n\nContact: contact@sidelabs.net`,
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
        lbl_letterbox_toggle: "Fit to Canvas (Letterboxing)",
        canvas_ratio: "Canvas Ratio",
        orientation: "Orientation",
        orientation_portrait: "Portrait",
        orientation_landscape: "Landscape",
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
        client_side_badge: "100% Client-Side",
        total_pages: "총 페이지 수",
        add_files: "파일 추가",
        clear: "비우기",
        merge_style: "병합 & 스타일링",
        split_extract: "분할 & 추출",
        watermark_overlay: "워터마크 오버레이",
        watermark_text: "워터마크 텍스트",
        color: "색상",
        opacity: "불투명도",
        font_size: "글자 크기",
        angle: "각도 (도)",
        page_numbering: "페이지 번호 추가",
        format: "형식",
        simple_format: "단순형 (\"1\", \"2\")",
        page_of_format: "전체 페이지 포함 (\"Page 1 of 10\")",
        position: "위치",
        bottom_center: "하단 중앙",
        bottom_right: "하단 우측",
        top_right: "상단 우측",
        split_extract_config: "분할 및 추출 설정",
        split_all_pages: "모든 페이지 분할",
        split_all_desc: "각 페이지를 개별 PDF로 분할하여 하나의 ZIP 파일로 다운로드합니다.",
        extract_specific_pages: "특정 페이지 추출",
        extract_desc: "선택한 페이지들만 하나의 결합된 PDF로 추출합니다.",
        define_page_range: "페이지 범위 정의",
        define_range_ph: "예: 1-5, 8, 11-13",
        range_status_help: "페이지 번호나 범위를 입력하면 그리드에 하이라이트됩니다.",
        compile_export: "PDF 컴파일 및 내보내기",
        privacy_text: "서버로 데이터를 보내지 않습니다. 100% 안전함.",
        rotate_all: "전체 회전",
        reverse: "순서 반전",
        sort_by_name: "이름순 정렬",
        drop_title: "여기에 PDF 또는 이미지를 놓으세요",
        drop_desc: "여러 PDF 파일, PNG, JPG 파일을 드래그하여 큐를 작성하세요. 브라우저에서 편리하게 정렬, 회전 및 편집할 수 있습니다.",
        browse_files: "파일 찾기",
        demo_label: "기능을 테스트해보고 싶으신가요?",
        load_sample_pdf: "샘플 PDF 불러오기",
        unlock_pdf_title: "PDF 문서 잠금 해제",
        unlock_pdf_desc: "이 PDF 문서는 암호화되어 있어 열기 위한 비밀번호가 필요합니다.",
        incorrect_password: "잘못된 비밀번호입니다. 다시 시도해 주세요.",
        cancel: "취소",
        decrypt_file: "파일 암호 해제",
        theme_label: "테마",
        theme_light: "라이트",
        theme_dark: "다크",
        theme_auto: "자동",
        lang_label: "언어 설정",
        compress_quality: "압축 강도 (화질 균형)",
        lbl_compress_toggle: "PDF 압축 (용량 줄이기)",
        lbl_letterbox_toggle: "캔버스 크기에 맞춤 (레터박스)",
        canvas_ratio: "캔버스 비율",
        orientation: "방향",
        orientation_portrait: "세로",
        orientation_landscape: "가로",
        compress_warning_text: "주의: 압축 화질을 75% 이하로 너무 낮추면 문서 내 작은 글씨의 가독성이 떨어질 수 있습니다.",
        security_tooltip_text: "SidePDF는 무자본 서버리스 아키텍처로 구현되었습니다. 사용자의 파일은 중앙 서버로 절대 전송되지 않으며, 오직 현재 브라우저의 일시적인 샌드박스 메모리 안에서만 연산된 후 완전히 파기되므로 유출 우려가 0%입니다.",
        how_does_it_work: "보안 원리가 무엇인가요?",
        security_modal_title: "보안 및 개인정보 보호 안내",
        security_modal_desc: "SidePDF는 무자본 서버리스 아키텍처로 구현되었습니다. 사용자의 파일은 외부 서버로 일절 전송되지 않으며, 오직 현재 브라우저의 일시적인 샌드박스 메모리(RAM) 안에서만 처리된 후 즉시 휘발되므로 유출 가능성이 원천 차단됩니다.",
        close_btn: "닫기",
        privacy_policy_link: "개인정보처리방침",
        privacy_modal_title: "개인정보처리방침",
        privacy_policy_text: "SidePDF(이하 '서비스')는 이용자의 개인정보를 소중하게 다루며, 개인정보보호법 등 관련 법령을 준수합니다.\n\n1. 데이터 전송 및 처리 방식 (Zero Server Transfer)\n본 서비스는 어떠한 형태의 유저 파일 데이터(PDF, 이미지)도 외부 서버로 전송하지 않는 100% 클라이언트 사이드(Client-Side) 웹 애플리케이션입니다. 모든 편집, 회전, 압축 연산은 이용자의 웹 브라우저(RAM 및 로컬 CPU) 내부 샌드박스 환경에서만 안전하게 실행되고 휘발됩니다.\n\n2. 구글 태그 매니저(GTM) 및 통계 분석 데이터 수집 안내\n본 서비스는 이용자가 어떤 기능(압축, 분할, 그레이스케일 변환 등)을 주로 활용하는지 익명 통계를 파악하여 서비스를 개선하기 위해 Google Tag Manager (컨테이너: GTM-W2XNXZ7N) 도구를 이용합니다. 이 과정에서 유저의 파일 원본이나 개인 식별 정보는 일절 수집되지 않으며, 오직 익명화된 비식별 행동 이벤트 로그 데이터만 구글 분석 시스템으로 라우팅되어 통계로 집계됩니다.\n\n3. 구글 애드센스 및 서드파티 쿠키(Cookie) 안내\n본 서비스는 지속적인 무료 서비스 제공 및 유지비 충당을 위해 Google AdSense 광고를 이용할 수 있습니다. 서드파티 광고 네트워크는 이용자의 브라우저 쿠키(Cookie)나 방문 이력을 기반으로 맞춤형 광고를 송출할 수 있습니다. 이용자는 언제든지 브라우저 설정을 변경하여 쿠키 수집을 차단하고 거부할 수 있습니다.\n\n4. 개인정보 보호책임자 및 문의처\n본 서비스의 보안 아키텍처 및 텔레메트리 데이터에 대한 문의사항은 아래 연락처로 문의해 주시기 바랍니다.\n- 이메일: contact@sidelabs.net",
        terms_link: "이용약관",
        terms_modal_title: "이용약관",
        terms_policy_text: `SidePDF 이용약관\n\n1. 약관의 동의\nSidePDF(이하 '서비스')를 이용함으로써 귀하는 본 이용약관에 동의하게 됩니다. 약관에 동의하지 않으실 경우 서비스를 이용하실 수 없습니다.\n\n2. 서비스의 이용\n본 서비스는 브라우저 기반의 로컬 PDF 편집 도구입니다. 개인적 또는 상업적 목적으로 자유롭게 이용하실 수 있습니다. 모든 파일 처리는 이용자의 웹 브라우저 내에서만 안전하게 실행되므로, 원본 파일의 보관 책임은 이용자에게 있습니다.\n\n3. 보증의 부인\n본 서비스는 '있는 그대로(as is)' 제공되며, 명시적이거나 묵시적인 어떠한 보증도 제공하지 않습니다. 서비스가 중단 없이 작동하거나 오류가 없을 것임을 보증하지 않습니다.\n\n4. 책임의 제한\n서비스 운영자는 이용자가 서비스를 이용함에 따라 발생한 어떠한 직접적, 간접적, 부수적 손해에 대해서도 책임을 지지 않습니다.\n\n5. 준거법\n본 약관은 서비스 운영진이 속한 관할 지역의 법률에 따라 해석되고 규율됩니다.\n\n문의: contact@sidelabs.net`,
        about_link: "소개",
        about_modal_title: "소개",
        about_policy_text: `SidePDF 소개\n\nSidePDF는 SideLabs가 개발한 서버리스 기반의 100% 로컬 클라이언트 사이드 PDF 유틸리티 플랫폼입니다.\n\n저희의 미션은 사용자의 민감한 문서 데이터가 외부 서버로 절대 유출되지 않도록, 브라우저 샌드박스 내부(RAM 및 CPU)에서 모든 최적화, 병합, 분할 연산을 완벽하게 처리하는 보안 환경을 구축하는 것입니다. WebAssembly 기술을 적용하여 파일 업로드 대기 시간을 제로로 줄이고 완벽한 개인정보 보호를 보장합니다.\n\nSideLabs는 사용자의 프라이버시를 존중하고 클라이언트 사이드 컴퓨팅 파워를 극적화하는 제로트러스트 보안 웹 도구를 전문적으로 설계합니다.\n\n문의: contact@sidelabs.net`,
        filters_panel_title: "PDF 최적화 및 프로세싱 필터",
        strip_ocr_title: "OCR 텍스트 스트림 제거",
        strip_ocr_desc: "보이지 않는 OCR 텍스트 레이어를 제거하여 용량을 줄입니다.",
        flatten_vector_title: "벡터 잉크 획 병합 (플래튼)",
        flatten_vector_desc: "조각난 펜 필기 벡터 경로를 하나로 병합하여 랙을 줄입니다.",
        grayscale_title: "그레이스케일 변환 (흑백 필터)",
        grayscale_desc: "RGB/CMYK 색상 정의를 1채널 조도 벡터로 매핑합니다.",
        split_format_label: "내보내기 형식",
        format_pdf: "PDF 문서 (.pdf)",
        format_jpg: "JPEG 이미지 (.jpg)",
        format_png: "PNG 이미지 (.png)",
        
        toast_no_valid: "유효한 파일이 감지되지 않았습니다. PDF, JPEG, PNG 파일만 지원합니다.",
        toast_skipped_dup: "일부 중복 파일이 대기열에서 제외되었습니다.",
        toast_load_fail: "파일을 완전히 로드하지 못했습니다.",
        toast_parse_fail: "\"{0}\" 분석 실패: {1}",
        toast_download_success: "제한이 해제된 PDF 다운로드가 완료되었습니다!",
        toast_merge_success: "스타일이 적용된 PDF 다운로드가 완료되었습니다!",
        toast_extract_success: "선택한 페이지 추출 및 다운로드가 완료되었습니다!",
        toast_zip_success: "분할된 페이지 ZIP 파일 생성이 완료되었습니다!",
        toast_queue_cleared: "작업 공간이 비워졌습니다.",
        toast_reversed: "페이지 순서가 반전되었습니다.",
        toast_sorted: "대기열이 파일 이름순으로 정렬되었습니다.",
        toast_rotated_all: "그리드의 모든 페이지가 회전되었습니다.",
        toast_empty_queue: "작업 공간이 비어 있습니다. 먼저 파일을 로드하세요.",
        toast_invalid_range: "추출할 유효한 페이지 범위를 정의하세요.",
        toast_demo_loaded: "샘플 PDF가 생성되고 로드되었습니다!",
        toast_invalid_ranges_err: "Invalid page ranges: {0}",
        toast_no_valid_pages_err: "No valid pages selected for extraction.",
        toast_split_fail: "분할 실패: {0}",
        toast_compile_fail: "컴파일 실패: {0}",
        toast_pw_aborted: "비밀번호 입력이 취소되었습니다.",
        toast_unlock_success: "파일 암호가 성공적으로 해제되었습니다.",
        toast_clear_confirm: "대기 중인 활성 작업 공간을 비으시겠습니까?",

        loading_files: "파일을 불러오고 처리하는 중...",
        loading_warning: "대용량 파일 처리 시 브라우저 탭을 전환하거나 최소화하면 처리가 일시 중단될 수 있으므로 화면을 그대로 유지해 주세요.",
        purging_workspace: "작업 공간 초기화 중...",
        rotating_pipeline: "페이지들을 회전하는 중...",
        reversing_layout: "문서 레이아웃 순서 반전 중...",
        sorting_pipeline: "이름순으로 정렬하는 중...",
        compiling_pdf: "PDF 컴파일 중...",
        unlocking_assembling: "페이지 잠금 해제 및 어셈블리 중 ({0}/{1})...",
        stamping_watermark: "워터마크 스탬핑 중...",
        stamping_watermark_sub: "사용자 정의 대각선 워터마크 텍스트 오버레이 중...",
        numbering_pages: "페이지 번호 매기는 중...",
        numbering_pages_sub: "문서 바닥글 마커 도장 찍는 중...",
        saving_final: "최종 문서 저장 중...",
        saving_final_sub: "PDF 바이너리 레이아웃 스트림 생성 중...",
        splitting_document: "문서 분할 중...",
        splitting_document_sub: "개별 단일 페이지 문서 패키징 중...",
        packaging_zip: "ZIP 아카이브 압축 중...",
        packaging_zip_sub: "Generating ZIP file stream...",
        generating_sample: "샘플 PDF 생성 중...",
        generating_sample_sub: "로컬 환경에서 데모 문서 합성 중...",
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

function updateDocumentMetadata(lang) {
    const metaConfig = {
        ko: {
            title: "SidePDF - 서버 전송 없는 안전한 로컬 PDF 편집기",
            desc: "파일 업로드 없이 브라우저에서 100% 로컬로 처리되는 PDF 최적화 솔루션. 압축, 분할, 병합을 개인정보 유출 걱정 없이 안전하게 해결하세요."
        },
        en: {
            title: "SidePDF - 100% Client-Side Secure PDF Suite",
            desc: "Optimize, split, and merge documents directly in your browser. Zero server uploads, absolute data privacy, and instant local processing."
        }
    };
    const config = metaConfig[lang] || metaConfig['en'];
    
    document.title = config.title;
    
    document.querySelector('meta[name="description"]')?.setAttribute('content', config.desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', config.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', config.desc);
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
    document.querySelectorAll('.aspect-ratio-icon-container').forEach(el => el.innerHTML = getIconSvg('aspectRatio'));
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

    document.getElementById('terms-trigger')?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const titleEl = document.getElementById('terms-modal-title');
        const contentEl = document.getElementById('terms-modal-body-content');
        const modal = document.getElementById('terms-modal');
        
        if (titleEl) titleEl.textContent = t('terms_modal_title');
        if (contentEl) contentEl.textContent = t('terms_policy_text');
        if (modal) modal.classList.add('visible');
    });

    document.getElementById('modal-terms-close')?.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const modal = document.getElementById('terms-modal');
        if (modal) modal.classList.remove('visible');
    });

    document.getElementById('about-trigger')?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const titleEl = document.getElementById('about-modal-title');
        const contentEl = document.getElementById('about-modal-body-content');
        const modal = document.getElementById('about-modal');
        
        if (titleEl) titleEl.textContent = t('about_modal_title');
        if (contentEl) contentEl.textContent = t('about_policy_text');
        if (modal) modal.classList.add('visible');
    });

    document.getElementById('modal-about-close')?.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const modal = document.getElementById('about-modal');
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
        { checkboxId: 'toggle-grayscale', bodyId: null },
        { checkboxId: 'toggle-letterbox', bodyId: 'letterbox-options' }
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
        const tempDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
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
            pdfLibDoc = await PDFDocument.load(arrayBuffer, { password: userPassword || undefined, ignoreEncryption: true });
            // If PDF-Lib succeeds, load via PDFJS
            pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer.slice(0), password: userPassword || undefined }).promise;
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
                    const targetStream = stream.stream || stream;
                    const uncompressed = PDFLib.decodePDFRawStream(targetStream).getBytes();
                    const cleaned = stripOcrTextFromContentStream(uncompressed);
                    targetStream.contents = cleaned;
                    targetStream.dict.set(PDFName.of('Length'), PDFNumber.of(cleaned.length));
                    targetStream.dict.delete(PDFName.of('Filter'));
                }
            }
        } else {
            const stream = page.node.context.lookup(contents);
            if (stream instanceof PDFRawStream) {
                const targetStream = stream.stream || stream;
                const uncompressed = PDFLib.decodePDFRawStream(targetStream).getBytes();
                const cleaned = stripOcrTextFromContentStream(uncompressed);
                targetStream.contents = cleaned;
                targetStream.dict.set(PDFName.of('Length'), PDFNumber.of(cleaned.length));
                targetStream.dict.delete(PDFName.of('Filter'));
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
                    const targetStream = stream.stream || stream;
                    const uncompressed = PDFLib.decodePDFRawStream(targetStream).getBytes();
                    const cleaned = convertContentStreamToGrayscale(uncompressed);
                    targetStream.contents = cleaned;
                    targetStream.dict.set(PDFName.of('Length'), PDFNumber.of(cleaned.length));
                    targetStream.dict.delete(PDFName.of('Filter'));
                }
            }
        } else {
            const stream = page.node.context.lookup(contents);
            if (stream instanceof PDFRawStream) {
                const targetStream = stream.stream || stream;
                const uncompressed = PDFLib.decodePDFRawStream(targetStream).getBytes();
                const cleaned = convertContentStreamToGrayscale(uncompressed);
                targetStream.contents = cleaned;
                targetStream.dict.set(PDFName.of('Length'), PDFNumber.of(cleaned.length));
                targetStream.dict.delete(PDFName.of('Filter'));
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
                    const targetStream = stream.stream || stream;
                    const uncompressed = PDFLib.decodePDFRawStream(targetStream).getBytes();
                    const cleaned = flattenVectorInkContentStream(uncompressed);
                    stream.contents = cleaned;
                    stream.dict.set(PDFName.of('Length'), PDFNumber.of(cleaned.length));
                    stream.dict.delete(PDFName.of('Filter'));
                }
            }
        } else {
            const stream = page.node.context.lookup(contents);
            if (stream instanceof PDFRawStream) {
                const targetStream = stream.stream || stream;
                const uncompressed = PDFLib.decodePDFRawStream(targetStream).getBytes();
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
async function compressImageBuffer(arrayBuffer, mimeType, maxDim, quality) {
    return new Promise((resolve) => {
        const blob = new Blob([arrayBuffer], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            let w = img.width;
            let h = img.height;
            if (w > maxDim || h > maxDim) {
                if (w > h) {
                    h = Math.round((h * maxDim) / w);
                    w = maxDim;
                } else {
                    w = Math.round((w * maxDim) / h);
                    h = maxDim;
                }
            }
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            canvas.toBlob((cblob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(new Uint8Array(reader.result));
                    canvas.width = 0;
                    canvas.height = 0;
                };
                reader.readAsArrayBuffer(cblob);
            }, 'image/jpeg', quality);
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(arrayBuffer); // Fallback to original
        };
        img.src = url;
    });
}

async function rasterizePdfPageToJpg(arrayBuffer, password, pageIndex, quality) {
    const pdfDocJs = await pdfjsLib.getDocument({ data: arrayBuffer.slice(0), password }).promise;
    try {
        const page = await pdfDocJs.getPage(pageIndex + 1);
        const scale = 1.5; // High quality scale
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({
            canvasContext: ctx,
            viewport: viewport
        }).promise;
        
        const imgBytes = await new Promise((resolve) => {
            canvas.toBlob((cblob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(new Uint8Array(reader.result));
                    canvas.width = 0;
                    canvas.height = 0;
                };
                reader.readAsArrayBuffer(cblob);
            }, 'image/jpeg', quality);
        });
        
        return {
            bytes: imgBytes,
            width: viewport.width,
            height: viewport.height
        };
    } finally {
        try {
            await pdfDocJs.destroy();
        } catch (e) {}
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
            // Iterate through all generated Blob URLs and execute URL.revokeObjectURL()
            generatedObjectUrls.forEach(url => {
                try {
                    URL.revokeObjectURL(url);
                } catch (e) {}
            });
            generatedObjectUrls = [];

            // Explicitly revoke any image URL in the queue
            queue.forEach(item => {
                if (item.thumbnailUrl && item.thumbnailUrl.startsWith('blob:')) {
                    try {
                        URL.revokeObjectURL(item.thumbnailUrl);
                    } catch (e) {}
                }
            });

            // Nullify any cached ArrayBuffer instances
            Object.keys(uploadedFiles).forEach(key => {
                uploadedFiles[key] = null;
            });

            // Explicitly reassign core memory maps to empty states
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

// Global dynamic filename prefix helper
function getExportFilename(defaultExt) {
    if (queue.length === 0) {
        return `sidepdf-export.${defaultExt}`;
    }
    const topItem = queue[0];
    const origName = topItem.originalName || 'document';
    
    // Strip native file extension suffix
    const lastDotIdx = origName.lastIndexOf('.');
    const baseName = lastDotIdx !== -1 ? origName.substring(0, lastDotIdx) : origName;
    
    // Clean baseName from dangerous symbols
    const sanitizedBase = baseName.replace(/[\/\\?%*:|"<>\s]/g, '_');
    
    return `sidepdf-${sanitizedBase}.${defaultExt}`;
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
                const exportName = getExportFilename('pdf');
                await exportCombined(selectedItems, exportName);
            }
        } else {
            const exportName = getExportFilename('pdf');
            await exportCombined(queue, exportName);
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
    const letterboxEnabled = document.getElementById('toggle-letterbox')?.checked;
    const compressEnabled = document.getElementById('toggle-compress')?.checked;
    const quality = parseFloat(document.getElementById('compress-quality')?.value || '0.9');

    let targetWidth = 595.28;
    let targetHeight = 841.89;

    if (letterboxEnabled) {
        const ratioSelect = document.getElementById('letterbox-ratio');
        const orientationSelect = document.getElementById('letterbox-orientation');
        const ratio = ratioSelect ? ratioSelect.value : 'a4';
        const orientation = orientationSelect ? orientationSelect.value : 'portrait';

        let baseWidth = 595.28;
        let baseHeight = 841.89;

        if (ratio === 'a4') {
            baseWidth = 595.28;
            baseHeight = 841.89;
        } else if (ratio === 'letter') {
            baseWidth = 612.00;
            baseHeight = 792.00;
        } else if (ratio === '16-9') {
            baseWidth = 473.56;
            baseHeight = 841.89;
        } else if (ratio === '4-3') {
            baseWidth = 631.42;
            baseHeight = 841.89;
        } else if (ratio === '1-1') {
            baseWidth = 841.89;
            baseHeight = 841.89;
        }

        if (orientation === 'landscape') {
            targetWidth = baseHeight;
            targetHeight = baseWidth;
        } else {
            targetWidth = baseWidth;
            targetHeight = baseHeight;
        }
    }

    try {
        outDoc = await PDFDocument.create();

        for (let idx = 0; idx < totalItems; idx++) {
            // UI Thread Yielding: Keep UI responsive
            await new Promise(resolve => setTimeout(resolve, 0));

            const item = queueItems[idx];
            updateLoading(t('unlocking_assembling', idx + 1, totalItems), item.originalName);
            updateLoadingProgress(Math.round((idx / totalItems) * 60)); 

            if (item.type === 'pdf') {
                if (compressEnabled) {
                    const arrayBuffer = uploadedFiles[item.fileId];
                    const password = filePasswords[item.fileId] || "";
                    updateLoading(t('unlocking_assembling', idx + 1, totalItems) + " (Rasterizing)", item.originalName);
                    
                    const rasterized = await rasterizePdfPageToJpg(arrayBuffer, password, item.pageIndex, quality);
                    const embedImg = await outDoc.embedJpg(rasterized.bytes);
                    
                    let w = targetWidth;
                    let h = targetHeight;
                    if (!letterboxEnabled) {
                        w = rasterized.width;
                        h = rasterized.height;
                    }
                    
                    const page = outDoc.addPage([w, h]);
                    
                    if (letterboxEnabled) {
                        const isRotated = item.rotation === 90 || item.rotation === 270;
                        const displayW = isRotated ? rasterized.height : rasterized.width;
                        const displayH = isRotated ? rasterized.width : rasterized.height;
                        
                        const scale = Math.min(targetWidth / displayW, targetHeight / displayH);
                        const drawW = rasterized.width * scale;
                        const drawH = rasterized.height * scale;
                        
                        const targetX = (targetWidth - displayW * scale) / 2;
                        const targetY = (targetHeight - displayH * scale) / 2;
                        
                        let drawX = 0;
                        let drawY = 0;
                        
                        if (item.rotation === 0) {
                            drawX = targetX;
                            drawY = targetY;
                        } else if (item.rotation === 90) {
                            drawX = targetX + displayW * scale;
                            drawY = targetY;
                        } else if (item.rotation === 180) {
                            drawX = targetX + displayW * scale;
                            drawY = targetY + displayH * scale;
                        } else if (item.rotation === 270) {
                            drawX = targetX;
                            drawY = targetY + displayH * scale;
                        }
                        
                        page.drawImage(embedImg, {
                            x: drawX,
                            y: drawY,
                            width: drawW,
                            height: drawH,
                            rotate: degrees(item.rotation)
                        });
                    } else {
                        const isRotated = item.rotation === 90 || item.rotation === 270;
                        const displayW = isRotated ? rasterized.height : rasterized.width;
                        const displayH = isRotated ? rasterized.width : rasterized.height;
                        
                        let drawX = 0;
                        let drawY = 0;
                        
                        if (item.rotation === 0) {
                            drawX = 0;
                            drawY = 0;
                        } else if (item.rotation === 90) {
                            drawX = displayW;
                            drawY = 0;
                        } else if (item.rotation === 180) {
                            drawX = displayW;
                            drawY = displayH;
                        } else if (item.rotation === 270) {
                            drawX = 0;
                            drawY = displayH;
                        }
                        
                        page.drawImage(embedImg, {
                            x: drawX,
                            y: drawY,
                            width: rasterized.width,
                            height: rasterized.height,
                            rotate: degrees(item.rotation)
                        });
                    }
                } else {
                    if (!loadedDocsPdfLib[item.fileId]) {
                        const arrayBuffer = uploadedFiles[item.fileId];
                        const password = filePasswords[item.fileId] || "";
                        loadedDocsPdfLib[item.fileId] = await PDFDocument.load(arrayBuffer, { password, ignoreEncryption: true });
                    }
                    const srcDoc = loadedDocsPdfLib[item.fileId];
                    
                    if (letterboxEnabled) {
                        const page = outDoc.addPage([targetWidth, targetHeight]);
                        const embeddedPage = await outDoc.embedPage(srcDoc.getPage(item.pageIndex));
                        
                        const srcPage = srcDoc.getPage(item.pageIndex);
                        const originalRotation = srcPage.getRotation().angle;
                        const totalRotation = (originalRotation + item.rotation) % 360;
                        const srcW = srcPage.getWidth();
                        const srcH = srcPage.getHeight();
                        const isRotated = totalRotation === 90 || totalRotation === 270;
                        const displayW = isRotated ? srcH : srcW;
                        const displayH = isRotated ? srcW : srcH;
                        
                        const scale = Math.min(targetWidth / displayW, targetHeight / displayH);
                        const drawW = srcW * scale;
                        const drawH = srcH * scale;
                        
                        const targetX = (targetWidth - displayW * scale) / 2;
                        const targetY = (targetHeight - displayH * scale) / 2;
                        
                        let drawX = 0;
                        let drawY = 0;
                        
                        if (totalRotation === 0) {
                            drawX = targetX;
                            drawY = targetY;
                        } else if (totalRotation === 90) {
                            drawX = targetX + displayW * scale;
                            drawY = targetY;
                        } else if (totalRotation === 180) {
                            drawX = targetX + displayW * scale;
                            drawY = targetY + displayH * scale;
                        } else if (totalRotation === 270) {
                            drawX = targetX;
                            drawY = targetY + displayH * scale;
                        }
                        
                        page.drawPage(embeddedPage, {
                            x: drawX,
                            y: drawY,
                            width: drawW,
                            height: drawH,
                            rotate: degrees(totalRotation)
                        });
                    } else {
                        const [copiedPage] = await outDoc.copyPages(srcDoc, [item.pageIndex]);
                        const originalRotation = copiedPage.getRotation().angle;
                        copiedPage.setRotation(degrees((originalRotation + item.rotation) % 360));
                        outDoc.addPage(copiedPage);
                    }
                }
            } else if (item.type === 'image') {
                let arrayBuffer = uploadedFiles[item.fileId];
                if (compressEnabled && quality < 1.0) {
                    arrayBuffer = await compressImageBuffer(arrayBuffer, item.mimeType, 1200, quality);
                }
                
                let embedImg;
                if ((!compressEnabled || quality === 1.0) && item.mimeType === 'image/png') {
                    embedImg = await outDoc.embedPng(arrayBuffer);
                } else {
                    embedImg = await outDoc.embedJpg(arrayBuffer);
                }

                if (letterboxEnabled) {
                    const page = outDoc.addPage([targetWidth, targetHeight]);
                    
                    const isRotated = item.rotation === 90 || item.rotation === 270;
                    const displayW = isRotated ? embedImg.height : embedImg.width;
                    const displayH = isRotated ? embedImg.width : embedImg.height;
                    
                    const scale = Math.min(targetWidth / displayW, targetHeight / displayH);
                    const drawW = embedImg.width * scale;
                    const drawH = embedImg.height * scale;
                    
                    const targetX = (targetWidth - displayW * scale) / 2;
                    const targetY = (targetHeight - displayH * scale) / 2;
                    
                    let drawX = 0;
                    let drawY = 0;
                    
                    if (item.rotation === 0) {
                        drawX = targetX;
                        drawY = targetY;
                    } else if (item.rotation === 90) {
                        drawX = targetX + displayW * scale;
                        drawY = targetY;
                    } else if (item.rotation === 180) {
                        drawX = targetX + displayW * scale;
                        drawY = targetY + displayH * scale;
                    } else if (item.rotation === 270) {
                        drawX = targetX;
                        drawY = targetY + displayH * scale;
                    }
                    
                    page.drawImage(embedImg, {
                        x: drawX,
                        y: drawY,
                        width: drawW,
                        height: drawH,
                        rotate: degrees(item.rotation)
                    });
                } else {
                    const displayW = item.rotation === 90 || item.rotation === 270 ? embedImg.height : embedImg.width;
                    const displayH = item.rotation === 90 || item.rotation === 270 ? embedImg.width : embedImg.height;
                    const page = outDoc.addPage([displayW, displayH]);
                    
                    let drawX = 0;
                    let drawY = 0;
                    
                    if (item.rotation === 0) {
                        drawX = 0;
                        drawY = 0;
                    } else if (item.rotation === 90) {
                        drawX = displayW;
                        drawY = 0;
                    } else if (item.rotation === 180) {
                        drawX = displayW;
                        drawY = displayH;
                    } else if (item.rotation === 270) {
                        drawX = 0;
                        drawY = displayH;
                    }
                    
                    page.drawImage(embedImg, {
                        x: drawX,
                        y: drawY,
                        width: embedImg.width,
                        height: embedImg.height,
                        rotate: degrees(item.rotation)
                    });
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

        const finalBytes = await outDoc.save({ useObjectStreams: compressEnabled });
        
        if (compressEnabled) {
            console.log(`[Verification] Actual Compressed Bytes: ${finalBytes.length} bytes (Quality: ${quality})`);
        }

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
        const compressEnabled = document.getElementById('toggle-compress')?.checked;
        const quality = parseFloat(document.getElementById('compress-quality')?.value || '0.9');

        for (let idx = 0; idx < totalItems; idx++) {
            // UI Thread Yielding: Keep UI responsive
            await new Promise(resolve => setTimeout(resolve, 0));

            const item = queue[idx];
            updateLoading(t('splitting_document'), item.originalName);

            const paddedNum = String(idx + 1).padStart(3, '0');

            if (format === 'pdf') {
                const singleDoc = await PDFDocument.create();

                if (item.type === 'pdf') {
                    if (compressEnabled) {
                        const buf = uploadedFiles[item.fileId];
                        const password = filePasswords[item.fileId] || "";
                        
                        const rasterized = await rasterizePdfPageToJpg(buf, password, item.pageIndex, quality);
                        const embedImg = await singleDoc.embedJpg(rasterized.bytes);
                        
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
                    } else {
                        if (!loadedDocsPdfLib[item.fileId]) {
                            const buf = uploadedFiles[item.fileId];
                            const password = filePasswords[item.fileId] || "";
                            // Load buffer directly - no copies!
                            loadedDocsPdfLib[item.fileId] = await PDFDocument.load(buf, { password, ignoreEncryption: true });
                        }
                        const srcDoc = loadedDocsPdfLib[item.fileId];
                        const [copiedPage] = await singleDoc.copyPages(srcDoc, [item.pageIndex]);

                        singleDoc.addPage(copiedPage);

                        const originalRotation = copiedPage.getRotation().angle;
                        const addedPage = singleDoc.getPages()[0];
                        addedPage.setRotation(degrees((originalRotation + item.rotation) % 360));
                    }
                } else if (item.type === 'image') {
                    let buf = uploadedFiles[item.fileId];
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

                // White-Label Metadata Override
                singleDoc.setProducer("SidePDF (https://pdf.sidelabs.net/)");
                singleDoc.setCreator("SidePDF (https://pdf.sidelabs.net/)");
                singleDoc.setAuthor("SidePDF (https://pdf.sidelabs.net/)");

                // Merge speed optimization: useObjectStreams: false unless compressEnabled is true
                const pageBytes = await singleDoc.save({ useObjectStreams: compressEnabled });
                const zipName = getExportFilename('zip'); // Use the dynamic filename prefix
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
        const zipName = getExportFilename('zip'); // Use the dynamic filename prefix
        downloadBlob(zipBlob, zipName);
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

    if (queue.length === 0) {
        estimateText.textContent = currentLang === 'ko' ? "예상 파일 크기: ~ 0 KB" : "Estimated Size: ~ 0 KB";
        return;
    }

    // Compute the absolute sum of the original bytes of all unique active documents in the queue
    let totalOriginalBytes = 0;
    const processedFiles = new Set();
    queue.forEach(item => {
        if (!processedFiles.has(item.fileId)) {
            processedFiles.add(item.fileId);
            const fileBytes = uploadedFiles[item.fileId]?.byteLength || 200000;
            totalOriginalBytes += fileBytes;
        }
    });

    let estimatedBytes = totalOriginalBytes;
    if (compressEnabled) {
        estimatedBytes = Math.round(totalOriginalBytes * quality);
    }

    const kb = estimatedBytes / 1024;
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
    generatedObjectUrls.push(url);
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

// Escapes html strings
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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
