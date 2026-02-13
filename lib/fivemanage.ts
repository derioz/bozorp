const FIVEMANAGE_API_KEY = import.meta.env.VITE_FIVEMANAGE_API_KEY || '';
const FIVEMANAGE_UPLOAD_URL = 'https://api.fivemanage.com/api/image';

export interface UploadResult {
    url: string;
    id: string;
}

export async function uploadToFiveManage(file: File): Promise<UploadResult> {
    if (!FIVEMANAGE_API_KEY) {
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
