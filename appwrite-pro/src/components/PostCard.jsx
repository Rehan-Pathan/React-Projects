/* eslint-disable react/prop-types */
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, className = "" }) {
  return (
    <Link to={`/post/${$id}`} className={`block ${className}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title || "Post image"}
            className="rounded-xl object-cover w-full h-48"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = "https://via.placeholder.com/150"; // Fallback placeholder image
            }}
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 truncate">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
