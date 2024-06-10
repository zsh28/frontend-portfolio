import { useEffect, useState } from 'react';

interface Project {
    id: number;
    title: string;
    description: string;
    url: string;
    github: string;
    technologies: string[];
};

const useProjectApi = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout

                const response = await fetch('/api/projects/', {
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
                    const json: Project[] = await response.json(); // Fetching an array of projects
                    setProjects(json);
                } else {
                    throw new Error('Received HTML instead of JSON');
                }
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { projects, error, loading };
}

export default useProjectApi;