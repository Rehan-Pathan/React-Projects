// src/components/About.js

import { Link, Outlet} from 'react-router-dom';

function About() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-black mb-4">About Us</h1>
      <p className="text-lg text-gray-600">Learn more about our team and mission.</p>
      <Link to="team" className="text-black underline hover:text-gray-950 mt-4 inline-block">Our Team</Link>
      <div className="mt-8">
        <Outlet/> {/* Render nested routes here */}
      </div>
    </div>
  );
}

export default About;
