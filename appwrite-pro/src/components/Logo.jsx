/* eslint-disable react/prop-types */
import logoImage from '../assets/logo.jpg';  // Adjust the relative path if necessary

function Logo({ width = '100px' }) {
  return (
    <div>
      <img 
        src={logoImage}  // Replace with the actual path to your image
        alt="Logo"
        style={{ width: width }}  // You can dynamically adjust the width of the logo using props
      />
    </div>
  );
}

export default Logo;
