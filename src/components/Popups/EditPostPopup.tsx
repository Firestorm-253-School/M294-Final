import { useEffect, useState } from "react";
import Post from "../../interfaces/Post";
import MediaLink from "../../interfaces/MediaLink";
import { ApiPut } from "../api";

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

    const response = await ApiPut(newPostObject, `posts/${props.postObject.id}`)
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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="card w-96 bg-base-100 shadow-2xl rounded-lg p-6">
            <div className="card-body">
              <h2 className="text-2xl font-semibold text-primary mb-4">Edit Post</h2>
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
                className="space-y-4"
              >
                <div>
                  <label htmlFor="content" className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    defaultValue={props.postObject.content}
                    className="textarea textarea-bordered w-full h-32"
                    required
                  ></textarea>
                </div>

                {mediaLinks?.map((link, index) => {
                  return (
                    <div key={index} className="flex items-center justify-between mb-4">
                      <h4 className="text-lg">
                        {link.source}: {link.url}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="btn btn-sm btn-error"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}

                <div className="flex justify-between">
                  <button
                    type="reset"
                    onClick={() => props.closePostPopup()}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditPostPopup;
