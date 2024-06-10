import { TypeAnimation } from 'react-type-animation';
import useAboutApi from '../api/about';

const About = () => {
  const { profiles, error, loading } = useAboutApi();

  return (
    <>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-300 text-center">
          Hello. I'm Zeeshanali.
        </h1>
        <div className="text-3xl md:text-4xl lg:text-5xl font-normal text-orange-400 mt-4 text-center">
          <TypeAnimation
            preRenderFirstString={true}
            sequence={[
              'A Software Developer.',
              2000,
              'A Web Developer.',
              2000,
              'A Mobile App Developer.',
              2000,
            ]}
            wrapper="div"
            cursor={true}
            repeat={Infinity}
            style={{ display: 'block' }}
          />
        </div>
      <p className="text-base sm:text-2xl md:text-2xl lg:text-2xl font-light text-gray-300 text-center p-4">
        I am passionate about leveraging technology to create innovative solutions.
        <br />
        I develop user-friendly, efficient, and accessible applications.
      </p>
      <br />
      <br />
      <section id="about" className="scroll-offset">
        <div className="mx-4 md:mx-20">
          <h1 className="text-xl mb-4 text-gray-300">About</h1>
          {loading ? (
            <p className="text-md font-light text-gray-300">Loading...</p>
          ) : error ? (
            <p className="text-md font-light text-red-500">Error: {error}</p>
          ) : profiles.length > 0 ? (
            profiles.map((profile) => (
              <span key={profile.id} className="text-md font-light text-gray-300">{profile.description}</span>
            ))
          ) : (
            <p className="text-md font-light text-gray-300">No profiles found</p>
          )}
        </div>
      </section>
    </>
  );
};

export default About;
