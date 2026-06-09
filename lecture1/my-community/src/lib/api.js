import { supabase } from './supabase';

export async function registerUser({ username, nickname, password }) {
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .maybeSingle();
  if (existing) throw new Error('이미 사용 중인 아이디입니다.');

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, nickname, password }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function loginUser({ username, password }) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
  return data;
}

export async function checkUsername(username) {
  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .maybeSingle();
  return !!data;
}

export async function getPosts(category = null) {
  let query = supabase
    .from('posts')
    .select('*, post_likes(count)')
    .order('created_at', { ascending: false });
  if (category) query = query.eq('category', category);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map((p) => ({
    ...p,
    like_count: p.post_likes?.[0]?.count ?? 0,
  }));
}

export async function getPost(id) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function createPost({ title, content, category, image_url, hashtags, author_id, author_nickname }) {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ title, content, category, image_url, hashtags, author_id, author_nickname }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function togglePostLike(postId, userId) {
  const { data: existing } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .maybeSingle();

  if (existing) {
    await supabase.from('post_likes').delete().eq('id', existing.id);
    return false;
  }
  await supabase.from('post_likes').insert([{ post_id: postId, user_id: userId }]);
  return true;
}

export async function getPostLikeCount(postId) {
  const { count } = await supabase
    .from('post_likes')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId);
  return count || 0;
}

export async function isPostLiked(postId, userId) {
  const { data } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .maybeSingle();
  return !!data;
}

export async function getComments(postId) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createComment({ post_id, author_id, author_nickname, content }) {
  const { data, error } = await supabase
    .from('comments')
    .insert([{ post_id, author_id, author_nickname, content }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function searchPosts(keyword) {
  const { data, error } = await supabase
    .from('posts')
    .select('*, post_likes(count)')
    .or(`title.ilike.%${keyword}%,content.ilike.%${keyword}%`)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((p) => ({
    ...p,
    like_count: p.post_likes?.[0]?.count ?? 0,
  }));
}
