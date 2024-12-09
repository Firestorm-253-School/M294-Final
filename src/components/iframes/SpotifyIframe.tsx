export interface ISpotifyIframeProps {
  trackId: String;
  isOpen: boolean;
  closeIframe: () => void;
}

const SpotifyIframe: React.FC<ISpotifyIframeProps> = (props) => {
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
            src={`https://open.spotify.com/embed/track/${props.trackId}/?utm_source=generator`}
            width="100%"
            height="100%"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      ) : null}
    </>
  );
};

export default SpotifyIframe;
