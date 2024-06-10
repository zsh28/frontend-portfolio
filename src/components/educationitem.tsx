import React from 'react';

interface EducationItemProps {
    dateRange: string;
    school: string;
    degree: string;
    description: string;
}

const EducationItem: React.FC<EducationItemProps> = ({
    dateRange,
    school,
    degree,
    description
}) => {
    return (
        <div className="mb-8 p-4 border border-orange-400 rounded-lg glowing-border">
            <div className="flex justify-between mb-2">
                <span className="text-lg text-gray-300">{dateRange}</span>
                <span className="flex items-center text-lg text-gray-300">
                    {school}
                </span>
            </div>
            <div className='flex flex-wrap space-x-2'>
                <h2 className="text-xl text-gray-300 mb-2">{degree}</h2>
                <p className="text-base text-gray-300 mb-4 whitespace-pre-line">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default EducationItem;
