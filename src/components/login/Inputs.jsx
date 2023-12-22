const Input = ({ type, name, value, placeholder, onChange }) => {
    return (
        <input
            className="pb-3 bg-transparent border-b border-gray-600 outline-none"
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default Input;
