import React from 'react';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

interface ExperienceItemProps {
  dateRange: string;
  company: string;
  position: string;
  description: string;
  technologies: string[];
  location: string;
  url: string;
  present: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  dateRange,
  company,
  position,
  description,
  technologies,
  location,
  url,
  present,
}) => {
  const displayDateRange = present ? `${dateRange.split(' - ')[0]} - Present` : dateRange;

  // Splitting the description into an array of lines
  const descriptionLines = description.split('\r\n');

  return (
    <div className="mb-8 p-4 border border-orange-400 rounded-lg glowing-border">
      <div className="flex justify-between mb-2">
        <span className="text-lg text-gray-300">{displayDateRange}</span>
        <span className="flex items-center text-lg text-gray-300">
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
            {company} <FaExternalLinkSquareAlt className="ml-2 text-orange-400" />
          </a>
        </span>
      </div>
      <div className="text-lg text-gray-300 mb-2">{location}</div>
      <h2 className="text-xl text-gray-300 mb-2">{position}</h2>
      {/* Rendering each line of the description separately */}
      <div className="text-base text-gray-300 mb-4">
        {descriptionLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <div className="flex flex-wrap space-x-2">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-indigo-900 border border-orange-400 text-orange-400 px-2 py-1 rounded mb-2">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExperienceItem;
