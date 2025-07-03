import { useUser } from '../context/UserContext';

export default function Profile() {
  const { user } = useUser();

  if (!user) return <div className="p-4">You must be logged in to view this page.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Your Profile</h2>
      <p className="mt-2">Email: {user.email}</p>
      <p>ID: {user.id}</p>
    </div>
  );
}