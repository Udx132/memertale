import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="flex gap-4 bg-blue-500 text-white p-4">
      <Link to="/">Home</Link>
      <Link to="/create">Create</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/chat">Chat</Link>
      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          {user.role === 'admin' && <Link to="/admin">Admin</Link>}
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}