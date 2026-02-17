
const fs = require('fs');
const path = require('path');

const API_KEY = 'Z45ZqbFMiEkKfh4ePi9lSNUg99dC3aCQ';
const FILE_PATH = path.join(__dirname, 'public', 'bozorp-logo.png');

async function testUpload() {
    if (!fs.existsSync(FILE_PATH)) {
        console.error(`File not found: ${FILE_PATH}`);
        return;
    }

    const fileBuffer = fs.readFileSync(FILE_PATH);
    const blob = new Blob([fileBuffer], { type: 'image/png' });
    const formData = new FormData();
    formData.append('file', blob, 'bozorp-logo.png');

    try {
        const response = await fetch('https://api.fivemanage.com/api/image', {
            method: 'POST',
            headers: {
                'Authorization': API_KEY,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Upload failed: ${response.status} - ${errorText}`);
        } else {
            const data = await response.json();
            console.log('Upload successful:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testUpload();
