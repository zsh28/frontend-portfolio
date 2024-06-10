import { useEffect, useState } from 'react';

interface TechStack {
  id: number;
  name: string;
}

interface Experience {
  id: number;
  tech_stack: TechStack[];
  from_date: string;
  to_date: string;
  title: string;
  description: string;
  company: string;
  location: string;
  image: string | null;
  url: string;
  github: string;
  present: boolean;
  techstack: string[];
  daterange: string;
}

const useExperienceApi = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout

        const response = await fetch('/api/experiences/', {
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
          const json: Experience[] = await response.json(); // Fetching an array of experiences
          // Transform tech_stack to an array of strings
          const transformedExperiences = json.map((exp) => ({
            ...exp,
            techstack: exp.tech_stack.map((tech) => tech.name),
            daterange: `${exp.from_date} - ${exp.to_date}`,
          }));
          setExperiences(transformedExperiences);
        } else {
          throw new Error('Received HTML instead of JSON');
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return { experiences, error, loading };
};

export default useExperienceApi;
