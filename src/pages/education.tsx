import EducationItem from "../components/educationitem";
import useEducationApi from "../api/education";


const Education = () => {
  const { educations, error, loading } = useEducationApi();

  if (loading) {
    return <p className="text-xl mb-4 text-gray-300">Loading...</p>;
}
if (error) {
    return <p className="text-xl mb-4 text-gray-300">Error: {error}</p>;
}
  return (
    <>
      <section id="education" className="scroll-offset">
        <div className="mx-4 md:mx-20">
          <h1 className="text-xl mb-4 text-gray-300">Education</h1>
          {educations.map((education) => (
            <EducationItem
              key={education.id}
              dateRange={`${education.from_date} - ${education.present ? 'Present' : education.to_date}`}
              school={education.school}
              degree={education.degree}
              description={education.description}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Education;
