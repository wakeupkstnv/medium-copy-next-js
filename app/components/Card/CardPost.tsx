import React from 'react';
import TagButton from '../Button/TagButton';
import { Post } from '../../types';
import Link from 'next/link';

interface CardPostProps {
  post: Post;
}

const CardPost: React.FC<CardPostProps> = ({ post }) => {
  return (
    <div className='mb-4 flex flex-col md:flex-row border-b border-gray-300'>
      <div className='md:w-2/3'>
        <Link key={post.id} href={`/show/${post.id}`}>   
            <h1 className='text-lg font-extrabold'>{post.title}</h1>
            <p className='mt-1'>{post.body}</p>
        </Link>
        <div className='flex items-center space-x-2 mt-4 mb-8'>
          {post.tags.map((tag, index) => (
            <TagButton key={index} tag_text={tag} />
          ))}
          <div className='hidden sm:block text-slate-500'>
            {post.reactions.likes} likes, {post.reactions.dislikes} dislikes, {post.views} views
          </div>
        </div>
      </div>
      <div className='hidden md:block md:w-1/3 mt-4 md:mt-0 md:ml-4'>
        <img 
          src={`https://picsum.photos/600/450?random=${post.id}`}
          alt="Picture"
          className='rounded-lg shadow-lg'
        />
      </div>
    </div>
  );
};

export default CardPost;
