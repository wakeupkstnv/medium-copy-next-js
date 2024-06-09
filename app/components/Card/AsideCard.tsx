import React from 'react';
import TagButton from '../Button/TagButton';
import { Post } from '../../types';
import Link from 'next/link';

interface AsideCardProps {
  post: Post;
}

const AsideCard: React.FC<AsideCardProps> = ({ post }) => {
  return (
    <div className='mb-4 border-b border-gray-300 rounded-2xl'>
      <Link key={post.id} href={`/show/${post.id}`}>
        <h1 className='text-lg font-extrabold'>{post.title}</h1>
        <p className='mt-1'>{post.body}</p>
      </Link >
      <div className='flex items-center space-x-2 mt-4 mb-8'>
        {post.tags.map((tag, index) => (
          <TagButton key={index} tag_text={tag} />
        ))}
      </div>
    </div>
  );
};

export default AsideCard;
