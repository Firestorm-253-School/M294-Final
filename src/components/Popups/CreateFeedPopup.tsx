//!!!!IMPLEMENT ERROR HANDLING!!!!!

import { useState } from "react";
import { ApiPost } from "../api";
import { useNavigate } from "react-router";

export interface ICreateFeedPopup {
  closeFunktion: Function;
  isOpen: boolean;
}

const CreateFeedPopup: React.FC<ICreateFeedPopup> = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ageRestriction, setAgeRestriction] = useState<number | string>("");
  const [cooldownMinutes, setCooldownMinutes] = useState<number | string>("");
  const [cooldownSeconds, setCooldownSeconds] = useState<number | string>("");

  const navigate = useNavigate();

  const createFeed = async () => {
    const totalCooldownSeconds =
      (parseInt(cooldownMinutes as string) || 0) * 60 +
      (parseInt(cooldownSeconds as string) || 0);
    const feedObject = {
      name: name,
      description: description,
      age_restriction: ageRestriction,
      cooldown: totalCooldownSeconds,
    };
    console.log(feedObject);
    const response = await ApiPost(feedObject, "livefeeds");
    window.location.reload();
    navigate("/");
    if (response.id) {
      console.log(response.id);
    }
  };

  const increment = (
    setter: React.Dispatch<React.SetStateAction<number | string>>,
    value: number | string
  ) => {
    setter((prev) => (prev === "" ? 1 : +prev + 1));
  };

  const decrement = (
    setter: React.Dispatch<React.SetStateAction<number | string>>,
    value: number | string
  ) => {
    setter((prev) => (prev === "" ? 0 : Math.max(0, +prev - 1)));
  };

  const handleNumericInput = (
    setter: React.Dispatch<React.SetStateAction<number | string>>,
    value: string
  ) => {
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    setter(sanitizedValue);
  };

  return (
    <>
      {props.isOpen ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="card w-96 bg-base-100 shadow-lg rounded-xl p-6">
            <h3 className="text-2xl font-bold text-center mb-4">Create Feed</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="input input-bordered w-full mb-4"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="textarea textarea-bordered w-full mb-4"
            />
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={ageRestriction}
                onChange={(e) =>
                  handleNumericInput(setAgeRestriction, e.target.value)
                }
                placeholder="Age Restriction"
                className="input input-bordered w-full"
              />
              <button
                onClick={() => increment(setAgeRestriction, ageRestriction)}
                className="btn btn-sm btn-outline ml-2"
              >
                +
              </button>
              <button
                onClick={() => decrement(setAgeRestriction, ageRestriction)}
                className="btn btn-sm btn-outline ml-2"
              >
                -
              </button>
            </div>
            <div className="flex space-x-2 mb-4">
              <div className="flex items-center w-full">
                <input
                  type="text"
                  value={cooldownMinutes}
                  onChange={(e) =>
                    handleNumericInput(setCooldownMinutes, e.target.value)
                  }
                  placeholder="Minutes"
                  className="input input-bordered w-full"
                />
                <button
                  onClick={() => increment(setCooldownMinutes, cooldownMinutes)}
                  className="btn btn-sm btn-outline ml-2"
                >
                  +
                </button>
                <button
                  onClick={() => decrement(setCooldownMinutes, cooldownMinutes)}
                  className="btn btn-sm btn-outline ml-2"
                >
                  -
                </button>
              </div>
              <div className="flex items-center w-full">
                <input
                  type="text"
                  value={cooldownSeconds}
                  onChange={(e) =>
                    handleNumericInput(setCooldownSeconds, e.target.value)
                  }
                  placeholder="Seconds"
                  className="input input-bordered w-full"
                />
                <button
                  onClick={() => increment(setCooldownSeconds, cooldownSeconds)}
                  className="btn btn-sm btn-outline ml-2"
                >
                  +
                </button>
                <button
                  onClick={() => decrement(setCooldownSeconds, cooldownSeconds)}
                  className="btn btn-sm btn-outline ml-2"
                >
                  -
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => props.closeFunktion()}
                className="btn btn-ghost text-gray-600"
              >
                Cancel
              </button>
              <button onClick={createFeed} className="btn btn-primary">
                Create Feed
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CreateFeedPopup;
