import { useEffect, useState } from 'react';

interface Education {
  id: number;
  school: string;
  degree: string;
  from_date: string;
  to_date: string;
  present: boolean;
  description: string;
}

const useEducationApi = () => {
    const [educations, setEducations] = useState<Education[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchEducations = async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout
    
            const response = await fetch('/api/educations/', {
            headers: {
                Accept: 'application/json',
            },
            signal: controller.signal,
            });
    
            clearTimeout(timeoutId);
    
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
    
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
            const json: Education[] = await response.json(); // Fetching an array of educations
            setEducations(json);
            } else {
            throw new Error('Received HTML instead of JSON');
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
        };
    
        fetchEducations();
    }, []);
    
    return { educations, error, loading };
};

export default useEducationApi;