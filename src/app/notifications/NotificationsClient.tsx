'use client';

import { useState } from 'react';
import Notification from '@/components/Notification';

const NotificationsClient = () => {
  const [notifications, setNotifications] = useState<string[]>(['New club request', 'Profile update required']);

  return (
    <main>
      {notifications.map((notification, index) => (
        <Notification key={index} message={notification} />
      ))}
    </main>
  );
};

export default NotificationsClient;
