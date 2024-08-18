import useSkillsApi from '../api/skills';

const SkillSet = () => {
  const { skills, error, loading } = useSkillsApi();

  return (
    <>
      <br />
      <br />
      <section id="skillstechstack" className="scroll-offset">
        <div className="mx-4 md:mx-20">
          <h1 className="text-xl mb-4 text-gray-300">Skills</h1>
          {loading ? (
            <p className="text-md font-light text-gray-300">Loading...</p>
          ) : error ? (
            <p className="text-md font-light text-red-500">Error: {error}</p>
          ) : skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span
                  key={skill._id}
                  className="bg-indigo-900 border border-orange-400 text-orange-400 px-2 py-1 rounded"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-md font-light text-gray-300">No skills found</p>
          )}
        </div>
      </section>
    </>
  );
};

export default SkillSet;
