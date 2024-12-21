/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    hoverBgColor = "hover:bg-blue-700",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${hoverBgColor} ${textColor} ${className} focus:outline-none focus:ring-2 focus:ring-blue-300`}
            {...props}
        >
            {children}
        </button>
    );
}
