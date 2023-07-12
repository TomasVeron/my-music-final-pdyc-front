const AppButton = ({ type, onClick, value }) => {
  return (
    <>
      <div className="flex justify-center rounded-md mt-7 mb-3">
        <button className="w-full bg-blue-700  rounded-md text-white py-1 font-bold" type={type} onClick={onClick}>
          {value}
        </button>
      </div>
    </>
  );
};

export default AppButton;
