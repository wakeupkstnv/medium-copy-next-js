import React from 'react';

interface TagButtonProps {
  tag_text: string;
}

const TagButton: React.FC<TagButtonProps> = ({ tag_text }) => {
  return (
    <div className='inline-block px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-2xl shadow-md cursor-pointer'>
      {tag_text}
    </div>
  );
};

export default TagButton;
