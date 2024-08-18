import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import useContactApi from "../api/contacts";

// Get the latest year
const year = new Date().getFullYear();

const Footer = () => {
    const { contacts, error, loading } = useContactApi();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const getContactIcon = (title: string) => {
        switch (title.toLowerCase()) {
            case 'linkedin':
                return <FaLinkedin className="text-gray-300 hover:text-orange-400 transition text-lg" />;
            case 'github':
                return <FaGithub className="text-gray-300 hover:text-orange-400 transition text-lg" />;
            case 'email':
                return <MdOutlineEmail className="text-gray-300 hover:text-orange-400 transition text-lg" />;
            default:
                return null;
        }
    };

    const getContactHref = (title: string, link: string) => {
        if (title.toLowerCase() === 'email') {
            return `mailto:${link.replace(/^https?:\/\//, '')}`;
        }
        return link;
    };

    return (
        <>
            <br />
            <br />
            <footer className="border-t border-orange-400 mx-4 md:mx-20 p-4 flex justify-between">
                <div className="text-gray-300">© {year} Zeeshanali Gulamhusein</div>
                <div className="flex space-x-4">
                    {contacts.map(contact => (
                        <a 
                            key={contact._id} 
                            href={getContactHref(contact.title, contact.link)} 
                            target={contact.title.toLowerCase() !== 'email' ? "_blank" : undefined} 
                            rel="noopener noreferrer"
                        >
                            {getContactIcon(contact.title)}
                        </a>
                    ))}
                </div>
            </footer>
            <br />
        </>
    );
};

export default Footer;
