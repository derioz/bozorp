const FIVEMANAGE_API_KEY = 'Z45ZqbFMiEkKfh4ePi9lSNUg99dC3aCQ';
const FIVEMANAGE_UPLOAD_URL = 'https://api.fivemanage.com/api/image';

export interface UploadResult {
    url: string;
    id: string;
}

export async function uploadToFiveManage(file: File): Promise<UploadResult> {
    console.log(`[FiveManage] Uploading file: ${file.name} (${file.size} bytes, ${file.type})`);
    console.log(`[FiveManage] Key configured: ${!!FIVEMANAGE_API_KEY} (Length: ${FIVEMANAGE_API_KEY?.length})`);

    if (!FIVEMANAGE_API_KEY) {
        console.error('[FiveManage] CRITICAL: API key is missing or empty string');
        throw new Error('FiveManage API key is not configured');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(FIVEMANAGE_UPLOAD_URL, {
        method: 'POST',
        headers: {
            'Authorization': FIVEMANAGE_API_KEY,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`FiveManage upload failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return {
        url: data.url,
        id: data.id || data.url,
    };
}
