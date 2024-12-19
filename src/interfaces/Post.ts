import MediaLink from "./MediaLink";
import { ApiDelete, ApiGet } from "../components/api";

export interface PostReactions {
  type: string;
  count: number;
}

export interface Medialink {
  medialinkId: number;
  source: string;
  url: string;
  postId: number;
}

export interface User {
  userId: number;
  username: string;
  displayName: string;
}

export interface Post {
  postId: number;
  user: User;
  content: string;
  likes: number;
  dislikes: number;
  rating: number;
  saved: boolean;
  medialinks: Medialink[];
  createdAt?: string; // Optional, falls nicht immer vorhanden
}

export async function GetPosts(page: number = 0) {
  const response = await ApiGet(`posts/page/${page}`);
  const posts: any = await response.response;

  // const dict: Record<number, Post> = posts.reduce((array: any, post: Post) => {
  //   array[post.id] = post;
  //   return array;
  // }, {});
  return posts;
}

export async function GetPostById(post_id: number) {
  return await ApiGet("posts/" + post_id);
}

export async function DeletePost(post_id: number) {
  return await ApiDelete("posts/" + post_id);
}
