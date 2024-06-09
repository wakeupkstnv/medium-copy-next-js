import { createContext } from "react";

export interface Post {
    id: number;
    title: string;
}

export interface PostsContextType {
    post: Post[];
    createPost: (title: string) => void;
    deletePost: (id: number) => void;    
}

export const PostsContext = createContext<PostsContextType | undefined>(undefined);


// fetch('https://dummyjson.com/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
      
//       username: 'emilys',
//       password: 'emilyspass',
//       expiresInMins: 30, // optional, defaults to 60
//     })
//   })
//   .then(res => res.json())
//   .then(console.log);