const fetchCv = async (): Promise<{ url: string; filename?: string } | string> => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout

        const response = await fetch('/api/cvs/', {
            headers: {
                Accept: 'application/json',
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Assuming the first item in the array is the file you want to download
        const fileInfo = data[0];
        const encodedUrl = fileInfo.encoded_file_path; // Assuming the URL is encoded in Base64
        const filename = fileInfo.file_name;

        // Decode the Base64 URL
        const fileUrl = atob(encodedUrl);

        // Fetch the file as a blob
        const fileResponse = await fetch(fileUrl, {
            headers: {
                Accept: 'application/pdf',
            },
            signal: controller.signal,
        });

        if (!fileResponse.ok) {
            throw new Error('Failed to download the file');
        }

        const blob = await fileResponse.blob();
        const url = window.URL.createObjectURL(blob);

        return { url, filename };
    } catch (error) {
        return (error as Error).message;
    }
};

export default fetchCv;
