import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useUser } from '../context/UserContext';

export default function VoteButtons({ memeId }) {
  const { user } = useUser();
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    const { data } = await supabase.from('votes').select('*').eq('meme_id', memeId);
    setScore(data.reduce((acc, vote) => acc + (vote.value === 'up' ? 1 : -1), 0));
  };

  const vote = async (value) => {
    if (!user) return;
    await supabase.from('votes').upsert({
      meme_id: memeId,
      user_id: user.id,
      value
    }, { onConflict: ['meme_id', 'user_id'] });
    fetchVotes();
  };

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => vote('up')} className="px-2 py-1 bg-green-500 text-white rounded">👍</button>
      <span>{score}</span>
      <button onClick={() => vote('down')} className="px-2 py-1 bg-red-500 text-white rounded">👎</button>
    </div>
  );
}