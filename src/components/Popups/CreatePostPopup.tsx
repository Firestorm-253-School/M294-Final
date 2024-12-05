export interface ICreatePostPopupProps {}

const CreatePostPopup: React.FC<ICreatePostPopupProps> = (props) => {
  return (
    <>
      <div style={{ position: "absolute", top: "0px" }}>
        <h1>Create A Post</h1>
      </div>
    </>
  );
};

export default CreatePostPopup;
