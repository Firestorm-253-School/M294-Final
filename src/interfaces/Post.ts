import Reaction from "./Reaction";
import MediaLink from "./MediaLink";
import { ApiDelete, ApiGet } from "../components/api";

export default interface Post {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  medialinks: MediaLink[];
  reactions: Reaction[];
}

export async function GetPosts() {
  const response = await ApiGet("posts/page/0");
  const posts: Post[] = await response.response;

  const dict: Record<number, Post> = posts.reduce((array: any, post: Post) => {
    post.created_at = new Date(post.created_at);
    post.updated_at = new Date(post.updated_at);
    array[post.id] = post;
    return array;
  }, {});
  return dict;
}

export async function GetPostById(post_id: number) {
  return await ApiGet("posts/" + post_id);
}

export async function DeletePost(post_id: number) {
  return await ApiDelete("posts/" + post_id);
}
