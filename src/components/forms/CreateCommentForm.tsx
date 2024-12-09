import { ApiPost } from "../api";

export interface ICreateCommentFormProps {
  postId: number;
  createCommentCallback: Function;
}

const CreateCommentForm: React.FC<ICreateCommentFormProps> = (props) => {
  const createComment = async (formData: any) => {
    const response = await ApiPost(
      { content: formData.content },
      `posts/${props.postId}/comments`
    );
    props.createCommentCallback();
    console.log(response);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
  
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
  
          form.reset();
  
          const data: Record<string, any> = {};
          formData.forEach((value, key) => {
            data[key] = value;
          });
  
          createComment(data);
        }}
        className="flex items-center space-x-4 mt-4"
      >
        <input
          type="text"
          name="content"
          id="content"
          placeholder="Write a comment"
          className="input input-bordered flex-grow"
        />
        <button className="btn btn-primary" type="submit">
          Send
        </button>
      </form>
    </>
  );
};

export default CreateCommentForm;
