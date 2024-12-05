export interface IAddMediaLinkProps {
  isVisible: boolean;
  cancelFunction: Function;
}

const AddMediaLink: React.FC<IAddMediaLinkProps> = (props) => {
  const add = (formData: any) => {
    console.log(formData.link);
    props.cancelFunction();
  };
  return (
    <>
      {props.isVisible ? (
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

              add(data);
            }}
          >
            <input type="text" name="link" id="link" placeholder="Add Link" />
            <button type="reset" onClick={() => props.cancelFunction()}>
              Cancel
            </button>
            <button type="submit">Add</button>
          </form>
        </>
      ) : null}
    </>
  );
};

export default AddMediaLink;
