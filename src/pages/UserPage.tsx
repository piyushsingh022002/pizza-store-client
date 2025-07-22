import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const UserPage: React.FC = () => {
  const [counter, setCounter] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  const fetchCounter = async () => {
    try {
      const res = await api.get('/user/counter');
      setCounter(res.data.counter);
    } catch (err) {
      console.error('Error fetching counter', err);
    } finally {
      setLoading(false);
    }
  };

  const updateCounter = async (action: 'increment' | 'decrement') => {
    try {
      const res = await api.post(`/user/counter/update?action=${action}`);
      setCounter(res.data.counter);
      setMessage(res.data.message);
    } catch (err) {
      console.error('Error updating counter', err);
    }
  };

  useEffect(() => {
    fetchCounter();
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: 'auto', paddingTop: 100 }}>
      <h2>👤 User Counter Dashboard</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>🔢 Current Counter: <strong>{counter}</strong></p>
          <div>
            <button onClick={() => updateCounter('increment')}>➕ Increment</button>
            <button onClick={() => updateCounter('decrement')} style={{ marginLeft: 10 }}>➖ Decrement</button>
          </div>
          {message && <p style={{ color: 'green', marginTop: 10 }}>{message}</p>}
        </>
      )}
    </div>
  );
};

export default UserPage;
