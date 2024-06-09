"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/layout/Navbar';
import CardPost from './components/Card/CardPost';
import AsideCard from './components/Card/AsideCard';
import Spinner from './components/Animations/Spinner';
import { Post } from './types';
import apiClient from './utils/axios';
import { useAuth } from './context/AuthContext';

const getElementByTag = (posts: Post[], tag: string): Post[] => {
  return posts.filter(post => post.tags.includes(tag));
};

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    apiClient.get('auth/posts')
      .then(res => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [isAuthenticated, router]);

  const sportPosts = getElementByTag(posts, 'fiction');
  const englishPosts = getElementByTag(posts, 'english');
  const historyPosts = getElementByTag(posts, 'history');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-11">
          {/* Main Content */}
          <section className="md:col-span-2 py-6">
            <div className="w-full border shadow-2xl p-4">
              {posts.map(post => (
                <CardPost key={post.id} post={post} />
              ))}
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className="md:col-span-1 py-6">
            <div className="sticky top-0">
              <h2 className="text-3xl font-extrabold mb-4">TOP 3 POSTS</h2>
              <div className="w-full border shadow-2xl p-4">
                {posts.slice(0, 3).map(post => (
                  <AsideCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </aside>

          {/* Sport Posts */}
          <aside className="md:col-span-1 py-6">
            <div className="sticky top-0">
              <h2 className="text-3xl font-extrabold mb-4">ABOUT SPORT</h2>
              <div className="w-full border shadow-2xl p-4">
                {sportPosts.slice(0, 3).map(post => (
                  <AsideCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </aside>

          {/* English Posts */}
          <aside className="md:col-span-1 py-6">
            <div className="sticky top-0">
              <h2 className="text-3xl font-extrabold mb-4">ABOUT ENGLISH</h2>
              <div className="w-full border shadow-2xl p-4">
                {englishPosts.slice(0, 3).map(post => (
                  <AsideCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </aside>

          {/* History Posts */}
          <aside className="md:col-span-1 py-6">
            <div className="sticky top-0">
              <h2 className="text-3xl font-extrabold mb-4">ABOUT HISTORY</h2>
              <div className="w-full border shadow-2xl p-4">
                {historyPosts.slice(0, 3).map(post => (
                  <AsideCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Home;
