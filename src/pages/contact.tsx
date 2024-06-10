import ContactForm from "../components/contactform";

const Contact = () => {
    return (
        <section id="contact" className="scroll-offset">
            <div className="mx-4 md:mx-20">
                <h1 className="text-xl mb-4 text-gray-300">Contact</h1>
                <ContactForm />
            </div>
        </section>
    );
};

export default Contact;