import { createContext, useContext, useState } from 'react';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'like', title: '좋아요', desc: '김시네님이 회원님의 게시물을 좋아합니다.', date: '방금 전', read: false },
  { id: 2, type: 'comment', title: '새 댓글', desc: '팝콘러버님이 댓글을 남겼습니다: "완전 공감해요!"', date: '5분 전', read: false },
  { id: 3, type: 'follow', title: '새 팔로워', desc: '무비덕후님이 회원님을 팔로우하기 시작했습니다.', date: '1시간 전', read: false },
  { id: 4, type: 'gathering', title: '모임 알림', desc: '인사이드 아웃 3 강남 모임이 내일 오후 7:30에 시작됩니다.', date: '2시간 전', read: true },
  { id: 5, type: 'like', title: '좋아요', desc: '영화왕님이 회원님의 게시물을 좋아합니다.', date: '어제', read: true },
  { id: 6, type: 'comment', title: '새 댓글', desc: '시네필님이 댓글을 남겼습니다: "저도 그 영화 봤어요!"', date: '어제', read: true },
];

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
