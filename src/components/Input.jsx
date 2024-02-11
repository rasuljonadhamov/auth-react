const Input = ({ label, type, placeHolder }) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="block">{label}</label>
      <input
        className="block w-full px-4 py-2 rounded-md bg-gray-200 text-gray-700 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        type={type}
        placeholder={placeHolder}
      />
    </div>
  );
};

export default Input;
