function Input({ type = "text", defaultValue, placeholder }) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full text-base font-medium border-2 border-gray-200 rounded-2xl py-3.5 px-5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all placeholder:text-gray-300"
    />
  );
}

export default Input;
