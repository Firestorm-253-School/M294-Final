export interface IYoutubeIframeProps {
  videoId: String;
  isOpen: boolean;
  closeIframe: () => void;
}

const YoutubeIframe: React.FC<IYoutubeIframeProps> = (props) => {
  return (
    <>
      {props.isOpen ? (
        <div className="fixed modal-box bg-gray-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 max-w-full max-h-full h-full w-full">
          <button
            onClick={() => props.closeIframe()}
            className="absolute right-10 top-10 bg-red-600 p-5 rounded-full font-bold shadow-xl"
          >
            Close
          </button>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${props.videoId}`}
            title="YouTube video player"
            allow="accelerometer; 
  clipboard-write; 
  encrypted-media; 
  gyroscope; 
  picture-in-picture; 
  web-share"
          ></iframe>
        </div>
      ) : null}
    </>
  );
};

export default YoutubeIframe;
