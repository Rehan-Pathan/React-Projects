/* eslint-disable react/prop-types */

function Logo({ width = '100px' }) {
  return (
    <div>
      <img 
        src="/path/to/your/logo.png"  // Replace with the actual path to your image
        alt="Logo"
        style={{ width: width }}  // You can dynamically adjust the width of the logo using props
      />
    </div>
  );
}

export default Logo;
