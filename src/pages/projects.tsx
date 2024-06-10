
import ProjectItem from '../components/projectitem';
import useProjectApi from '../api/project';

const Projects = () => {
    const { projects, error, loading } = useProjectApi();

    if (loading) {
        return <p className="text-xl mb-4 text-gray-300">Loading...</p>;
    }
    if (error) {
        return <p className="text-xl mb-4 text-gray-300">Error: {error}</p>;
    }
    return (
        <section id="projects" className="scroll-offset">
            <div className="mx-4 md:mx-20">
                <h1 className="text-xl mb-4 text-gray-300">Projects</h1>
                {projects.length === 0 ? (
                    <p className="text mb-4 text-gray-300 border border-orange-400 rounded-lg glowing-border p-2">Coming soon</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {projects.map((project, index) => (
                            <ProjectItem 
                                key={index}
                                title={project.title}
                                description={project.description}
                                url={project.url}
                                github={project.github}
                                technologies={project.technologies}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
