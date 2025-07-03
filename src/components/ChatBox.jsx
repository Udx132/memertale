import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useUser } from '../context/UserContext';

export default function ChatBox() {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel('realtime:chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase.from('chat').select('*').order('created_at', { ascending: true });
    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!newMsg || !user) return;
    await supabase.from('chat').insert({ user_id: user.id, content: newMsg });
    setNewMsg('');
  };

  return (
    <div className="p-4 border rounded max-w-lg mx-auto">
      <div className="h-64 overflow-y-auto border p-2 mb-2 bg-white">
        {messages.map((msg) => (
          <div key={msg.id}><strong>{msg.user_id}:</strong> {msg.content}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="border p-2 flex-grow" value={newMsg} onChange={(e) => setNewMsg(e.target.value)} />
        <button onClick={sendMessage} className="btn-primary">Send</button>
      </div>
    </div>
  );
}