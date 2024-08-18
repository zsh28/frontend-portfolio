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
          {educations.map((education) => {
            const formattedFromDate = new Date(education.from_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
            const formattedToDate = education.present
              ? 'Present'
              : new Date(education.to_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

            return (
              <EducationItem
                key={education._id}
                dateRange={`${formattedFromDate} - ${formattedToDate}`}
                school={education.school}
                degree={education.degree}
                description={education.description}
                present={education.present}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Education;
