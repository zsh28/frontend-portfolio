import React from 'react';

interface EducationItemProps {
    dateRange: string;
    school: string;
    degree: string;
    description: string;
    present: boolean;
}

const EducationItem: React.FC<EducationItemProps> = ({
    dateRange,
    school,
    degree,
    description,
    present
}) => {
    const displayDateRange = present ? `${dateRange.split(' - ')[0]} - Present` : dateRange;

    // Splitting the description into an array of lines
    const descriptionLines = description.split('\n');

    return (
        <div className="mb-8 p-4 border border-orange-400 rounded-lg glowing-border">
            <div className="flex justify-between mb-2">
                <span className="text-lg text-gray-300">{displayDateRange}</span>
                <span className="flex items-center text-lg text-gray-300">
                    {school}
                </span>
            </div>
            <h2 className="text-xl text-gray-300 mb-2">{degree}</h2>
            {/* Rendering each line of the description separately */}
            <div className="text-base text-gray-300 mb-4">
                {descriptionLines.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    );
}

export default EducationItem;
