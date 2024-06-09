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


