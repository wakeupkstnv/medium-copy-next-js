import React from 'react';
import Navbar from '../../components/layout/Navbar';
import axios from 'axios';
import { Post } from '../../types';

interface PostPageProps {
  post: Post | null;
}

const fetchPostById = async (id: number): Promise<Post | null> => {
  try {
    const response = await axios.get(`https://dummyjson.com/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
};


const PostPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const post = await fetchPostById(parseInt(id));

  if (!post) {
    return (
      <div>
        <Navbar />
        <main className="container mx-auto px-4 py-6">
          <div className="text-center text-xl text-red-500">Post not found</div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 py-11">
          <section className="md:col-span-2 py-6">
            <div className="w-full border shadow-2xl p-4">
              <h1 className="text-3xl font-extrabold mb-4">{post.title}</h1>
              <p className="mt-1">{post.body}</p>
              <div className="flex items-center space-x-2 mt-8 mb-8">
                {post.tags.map((tag, index) => (
                  <div key={index} className='inline-block px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-2xl shadow-md cursor-pointer'>
                    {tag}
                  </div>
                ))}
              </div>
              <div>
                <img src={`https://dummyjson.com/icon/abc${post.id}`}/>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PostPage;
