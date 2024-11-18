// src/components/NotFound.js

function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
        <p className="mt-4 text-lg text-gray-600">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    </div>
  );
}

export default NotFound;
