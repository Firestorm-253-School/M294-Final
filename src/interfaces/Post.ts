import MediaLink from "./MediaLink";
import { ApiDelete, ApiGet } from "../components/api";

export interface PostReactions {
  type: string;
  count: number;
}

export interface Post {
  postId: number;
  content: string;
  user: {
    username: string;
    displayName: string;
  };
  created_at: string;
  updated_at: string;
  medialinks?: MediaLink[];
  reactions?: PostReactions[];
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
