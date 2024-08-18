import { useEffect, useState } from 'react';

interface TechStack {
  _id: string;
  name: string;
}

interface Experience {
  _id: string;
  tech_stack: TechStack[];
  technologies: string[];
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
          const json: Experience[] = await response.json();
          // Transform tech_stack to an array of strings
          const transformedExperiences = json.map((exp) => ({
            ...exp,
            technologies: exp.tech_stack.map((tech) => tech.name), // Transform to string[]
            daterange: `${new Date(exp.from_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })} - ${exp.present ? 'Present' : new Date(exp.to_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}`,
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
