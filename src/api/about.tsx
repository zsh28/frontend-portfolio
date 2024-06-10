import { useEffect, useState } from 'react';

interface Profile {
  id: number;
  name: string;
  title: string;
  description: string;
}

const useAboutApi = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout

        const response = await fetch('/api/profiles/', {
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
          const json: Profile = await response.json(); // Fetching a single profile
          setProfiles([json]); // Set the fetched profile as a single-item array
        } else {
          throw new Error('Received HTML instead of JSON');
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return { profiles, error, loading };
};

export default useAboutApi;
