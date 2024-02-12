const Input = ({ label, type, placeHolder, name, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-lg font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeHolder}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-1 p-2 w-full border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
