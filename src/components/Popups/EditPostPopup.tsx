import { useEffect, useState } from "react";
import Post from "../../interfaces/Post";
import MediaLink from "../../interfaces/MediaLink";

export interface IEditPostPopupProps {
  isOpen: Boolean;
  postObject: Post;
  closePostPopup: Function;
}

const EditPostPopup: React.FC<IEditPostPopupProps> = (props) => {
  const [mediaLinks, setMediaLinks] = useState<MediaLink[]>();

  useEffect(() => {
    if (props.postObject) {
      setMediaLinks([...props.postObject.medialinks]);
    }
  }, [props.postObject]);

  const editPost = async (formData: any, mediaLinks: any) => {
    console.log(mediaLinks);
    const newPostObject = {
      content: formData.content,
      mediaLinks: mediaLinks,
    };
    console.log(newPostObject);

    const response = await fetch(
      `https://react-vid-app.vercel.app/api/posts/${props.postObject.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(newPostObject),
      }
    );
    window.location.reload();
    console.log(response);
  };
  const removeLink = (index: number) => {
    const updatedLinks = mediaLinks?.filter((_, i) => i !== index);
    setMediaLinks(updatedLinks);
  };
  return (
    <>
      {props.isOpen ? (
        <div>
          <h2>Edit Post</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);

              const data: Record<string, any> = {};
              formData.forEach((value, key) => {
                data[key] = value;
              });

              editPost(data, mediaLinks);
            }}
          >
            <textarea
              name="content"
              id="content"
              defaultValue={props.postObject.content}
            ></textarea>

            {mediaLinks?.map((link, index) => {
              return (
                <div>
                  <h4>
                    {link.source}: {link.url}
                  </h4>
                  <input
                    type="hidden"
                    name="mediaLinks"
                    id="mediaLinks"
                    value={JSON.stringify(link)}
                  />
                  <button type="button" onClick={() => removeLink(index)}>
                    Remove
                  </button>
                </div>
              );
            })}
            <button type="reset" onClick={() => props.closePostPopup()}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default EditPostPopup;
