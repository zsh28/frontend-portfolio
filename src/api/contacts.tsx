import { useEffect, useState } from 'react';

interface Contact {
    _id: number;
    title: string;
    link: string;
}

const useContactApi = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout

                const response = await fetch('/api/contacts/', {
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
                    const json: Contact[] = await response.json(); // Fetching an array of contacts
                    setContacts(json);
                } else {
                    throw new Error('Received HTML instead of JSON');
                }
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return { contacts, error, loading };
}

export default useContactApi;