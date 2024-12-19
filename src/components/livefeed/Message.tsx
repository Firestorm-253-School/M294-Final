export interface IMessageProps {
  message: any;
}

const Message: React.FC<IMessageProps> = (props) => {
  const message = props.message;
  return (
    <>
      <div className="bg-bg-100 w-max p-2 rounded-xl max-w-2xl">
        <div className="flex flex-row items-center gap-2">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col items-start justify-center">
            <p className="font-bold text-md text-nowrap">
              {message.user.displayName}
            </p>
            <p className="text-sm break-words w-full max-w-xl">
              {message.message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
