import LogoutButton from './LogoutButton';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-white">Tasko</h1>
        <LogoutButton />
      </div>
    </nav>
  );
} 