
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Notes App</h1>
        <p className="text-lg text-gray-600 mb-6">
          Organize your thoughts, capture your ideas, and stay productive!
        </p>
        {/* Get Started Button */}
        <Link href="/dashboard">
      
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition">
              Get Started
            </button>
       
        </Link>
      </div>

      
    </div>
  );
}
