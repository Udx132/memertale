import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import VoteButtons from '../components/VoteButtons';
import CommentSection from '../components/CommentSection';

export default function Home() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    const { data, error } = await supabase.from('memes').select('*').order('created_at', { ascending: false });
    if (!error) setMemes(data || []);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Latest Memes</h1>
      {memes.map((meme) => (
        <div key={meme.id} className="border rounded p-4 bg-white">
          <img src={meme.image_url} alt="meme" className="w-full max-w-md mx-auto mb-2" />
          <div className="text-center font-bold text-xl mb-2">{meme.top_text}</div>
          <div className="text-center font-bold text-xl mb-2">{meme.bottom_text}</div>
          <VoteButtons memeId={meme.id} />
          <CommentSection memeId={meme.id} />
        </div>
      ))}
    </div>
  );
}