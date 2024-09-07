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

        const fileInfo = data[0];
        const fileUrl = fileInfo.file_path;

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

        return { url, filename: fileInfo.file_name };
    } catch (error) {
        return (error as Error).message;
    }
};

export default fetchCv;
