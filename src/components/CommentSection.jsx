import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useUser } from '../context/UserContext';

export default function CommentSection({ memeId }) {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const { data } = await supabase.from('comments').select('*').eq('meme_id', memeId).order('created_at');
    setComments(data || []);
  };

  const postComment = async () => {
    if (!newComment || !user) return;
    await supabase.from('comments').insert({ meme_id: memeId, user_id: user.id, content: newComment });
    setNewComment('');
    loadComments();
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Comments</h3>
      <div className="space-y-2">
        {comments.map((c) => (
          <div key={c.id} className="border p-2 rounded bg-white">
            <p className="text-sm"><strong>{c.user_id}</strong>: {c.content}</p>
          </div>
        ))}
      </div>
      {user && (
        <div className="mt-2 flex gap-2">
          <input className="flex-grow border p-2" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." />
          <button onClick={postComment} className="btn-primary">Post</button>
        </div>
      )}
    </div>
  );
}