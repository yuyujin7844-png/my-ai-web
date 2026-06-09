// Unsplash 강아지·고양이 이미지 (ID 기반 안정적 URL)
const ANIMAL_IMAGES = [
  // 강아지
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=600&h=400&q=80',
  // 고양이
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1495360010541-f48722b4f2a3?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=600&h=400&q=80',
  'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=600&h=400&q=80',
];

// postId 기반으로 항상 같은 이미지 반환 (렌더마다 바뀌지 않음)
export function getAnimalImage(postId) {
  if (!postId) return ANIMAL_IMAGES[0];
  const hash = postId.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return ANIMAL_IMAGES[hash % ANIMAL_IMAGES.length];
}

// 버튼 클릭 시 랜덤 이미지
export function getRandomAnimalImage() {
  return ANIMAL_IMAGES[Math.floor(Math.random() * ANIMAL_IMAGES.length)];
}
