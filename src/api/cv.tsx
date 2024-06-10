const fetchCv = async (): Promise<{ url: string; filename?: string } | string> => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout

        const response = await fetch('https://portfolio-backend-xeby.onrender.com/cv/', {
            headers: {
                Accept: 'application/json',
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition?.split('filename=')[1]?.split(';')[0]?.trim();

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        return { url, filename };
    } catch (error) {
        return (error as Error).message;
    }
}

export default fetchCv;
