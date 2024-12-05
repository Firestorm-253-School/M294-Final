export interface ICreatePostPopupProps {
  isOpen: boolean;
}

const CreatePostPopup: React.FC<ICreatePostPopupProps> = (props) => {
  return (
    <>
      {props.isOpen ? (
        <div style={{ position: "absolute", top: "0px" }}>
          <h1>Create Post</h1>
          <textarea
            name="content"
            id="content"
            placeholder="write something"
          ></textarea>
        </div>
      ) : null}
    </>
  );
};

export default CreatePostPopup;
