import ExperienceItem from '../components/experienceitem';
import useExperienceApi from '../api/experience';

const Experience = () => {
  const { experiences, error, loading } = useExperienceApi();

  if (loading) {
    return <p className="text-xl mb-4 text-gray-300">Loading...</p>;
}
if (error) {
    return <p className="text-xl mb-4 text-gray-300">Error: {error}</p>;
}

  return (
    <>
      <br />
      <br />
      <section id="experience" className="scroll-offset">
        <div className="mx-4 md:mx-20">
          <h1 className="text-xl mb-4 text-gray-300">Experience</h1>
          {experiences.map((experience) => (
            <ExperienceItem
              key={experience.id}
              dateRange={experience.daterange}
              company={experience.company}
              position={experience.title}
              description={experience.description}
              technologies={experience.techstack}
              location={experience.location}
              url={experience.url}
              present={experience.present}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Experience;
