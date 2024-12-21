/* eslint-disable react/prop-types */
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    {
        label,
        type = "text",
        size = "medium", // Added size prop
        error = false,   // Added error prop
        className = "",
        ...props
    },
    ref
) {
    const id = useId();

    // Dynamic class for input size
    const sizeClass =
        size === "small"
            ? "px-2 py-1 text-sm"
            : size === "large"
            ? "px-4 py-3 text-lg"
            : "px-3 py-2";

    // Dynamic border color based on error
    const borderClass = error ? "border-red-500 focus:border-red-600" : "border-gray-200 focus:border-blue-400";

    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1 pl-1" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 w-full ${sizeClass} ${borderClass} ${className}`}
                ref={ref}
                id={id}
                {...props}
            />
            {error && <span className="text-red-500 text-sm mt-1">This field is required.</span>}
        </div>
    );
});

export default Input;
