import { useParams } from 'react-router-dom';

const User = () => {
  const { id } = useParams(); // Retrieve team member ID

  // Mock data for team members
  const teamMembers = {
    1: { name: "Alice Johnson", role: "Project Manager", bio: "Experienced in agile project management and client relations." },
    2: { name: "Bob Smith", role: "Lead Developer", bio: "Specializes in full-stack development with expertise in React and Node.js." },
  };

  const member = teamMembers[id] || { name: "Unknown", role: "N/A", bio: "No information available." };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-8 rounded-lg shadow-lg text-center w-fit">
      <h1 className="text-3xl font-semibold text-black">{member.name}</h1>
      <h2 className="text-xl font-light text-gray-600">{member.role}</h2>
      <p className="mt-4 text-gray-800">{member.bio}</p>
    </div>
  );
};

export default User;
