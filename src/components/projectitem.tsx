import React from 'react';
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

interface ProjectItemProps {
    //title, description, image, url, github, technologies
    title: string;
    description: string;
    url: string;
    github: string;
    technologies: string[];
}

const ProjectItem: React.FC<ProjectItemProps> = ({
    title,
    description,
    url,
    github,
    technologies
}) => {
    return (
        <div className="mb-8 p-4 border border-orange-400 rounded-lg glowing-border">
            <div className="flex justify-between mb-2">
                <span className="text-lg text-gray-300">{title}</span>
                <span className="flex items-center text-lg text-gray-300">
                    <a href={url} target="_blank" rel="noreferrer">
                        <FaExternalLinkSquareAlt className="ml-2 text-orange-400" />
                    </a>
                    <a href={github} target="_blank" rel="noreferrer">
                        <FaGithub className="ml-2 text-orange-400" />
                    </a>
                </span>
            </div>
            <p className="text-base text-gray-300 mb-4">
                {description}
            </p>
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

export default ProjectItem;