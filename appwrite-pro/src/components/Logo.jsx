/* eslint-disable react/prop-types */
import logoImage from '../assets/logo.jpg'; // Adjust the path if necessary

function Logo({ width = '100px', className = '', altText = 'Logo' }) {
  return (
    <div className={`logo-container ${className}`}>
      <img 
        src={logoImage} 
        alt={altText} 
        style={{ width }} 
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = 'https://via.placeholder.com/100'; // Placeholder image as fallback
        }}
        className="rounded-lg" // Adds a bit of style to the logo
      />
    </div>
  );
}

export default Logo;

