import { ApiPost } from "../api";

export interface ICreateCommentFormProps {
  postId: number;
}

const CreateCommentForm: React.FC<ICreateCommentFormProps> = (props) => {
  const createComment = async (formData: any) => {
    const response = await ApiPost(
      { content: formData.content },
      `posts/${props.postId}/comments`
    );
    console.log(response);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);

          const data: Record<string, any> = {};
          formData.forEach((value, key) => {
            data[key] = value;
          });

          createComment(data);
        }}
      >
        <input
          type="text"
          name="comment"
          id="comment"
          placeholder="Write A Comment"
        />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </>
  );
};

export default CreateCommentForm;
