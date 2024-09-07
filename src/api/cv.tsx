const fetchCv = async (): Promise<{ url: string; filename?: string } | string> => {
    try {
      const response = await fetch('/api/cvs/', {
        headers: {
          Accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const fileInfo = data[0]; // Get the first CV, for example
      const fileUrl = fileInfo.file_path;
  
      return { url: fileUrl, filename: fileInfo.file_name };
    } catch (error) {
      return (error as Error).message;
    }
  };
  
  export default fetchCv;  