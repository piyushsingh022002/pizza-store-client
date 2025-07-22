import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

interface Notification {
  username: string;
  changeType: string;
  timestamp: string;
}

const AdminPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5296/hubs/notifications') // adjust if deployed
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        console.log('Connected to SignalR hub');
      })
      .catch(err => console.error('SignalR connection error:', err));

    connection.on('ReceiveNotification', (data: Notification) => {
      setNotifications(prev => [data, ...prev]);
    });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: 'auto', paddingTop: 50 }}>
      <h2>🛡️ Hello Admin!</h2>
      <h4>Live Notifications</h4>
      {notifications.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <ul>
          {notifications.map((n, idx) => (
            <li key={idx} style={{ marginBottom: 10 }}>
              <strong>{n.username}</strong> performed <em>{n.changeType}</em> at{' '}
              <code>{new Date(n.timestamp).toLocaleString()}</code>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
