// todoApi.js
import axios from "axios";

export const API_SERVER_HOST = 'http://172.16.1.196:8097';
const prefix = `${API_SERVER_HOST}`;

export const getOne = async (id, tno) => {
  const res = await axios.get(`${prefix}/categories/${id}/contents/${tno}`);
  return res.data;
};

export const getList = async (pageParam) => {
  const res = await axios.get(`${prefix}/categories/${pageParam.id}/contents`);
  return res.data;
};

export const postAdd = async (pageParam, todo) => {
  const res = await axios.post(`${prefix}/categories/${pageParam}/contents/add`, {
    title: todo.title,
    writer: todo.writer,
    content: todo.content,
    pw: todo.pw,
  });
  return res.data;
};

export const deleteOne = async (pwData, tno, pageParam) => {
  try {
    const res = await axios.delete(`${prefix}/categories/${pageParam}/contents/${tno}`, { data: pwData });
    return res.data;
  } catch (error) {
    console.error("deleteOne error:", error);
    throw error;
  }
};

export const putOne = async (todo, pageParam, tno) => {
  const res = await axios.put(`${prefix}/categories/${pageParam}/contents/${tno}`, todo);
  return res.data;
};

export const getComments = async (id, tno) => {
  try {
    const res = await axios.get(`${prefix}/categories/${id}/contents/${tno}/comments`);
    console.log('Server Response:', res.data); // 추가
    return res.data || [];
  } catch (error) {
    console.error('Error getting comments:', error);
    throw error;
  }
};

export const createComment = async (id, tno, commentData) => {
  try {
    // Send a request to create a comment
    const res = await axios.post(`${prefix}/categories/${id}/contents/${tno}/comments`, {
      title: commentData.title,
      writer: commentData.writer,
      content: commentData.content,
      pw: commentData.pw,
    });

    // If the comment creation is successful, reload the page
    if (res.status === 200) {
      console.log('Comment created successfully');
      window.location.reload();
    }

    // Return the response data
    return res.data;
  } catch (error) {
    console.error('createComment error:', error);
    throw error;
  }
};

export const updateComment = async (id, tno, commentId, updatedCommentData) => {
  const res = await axios.post(`${prefix}/categories/${id}/contents/${tno}/comments/${commentId}`, updatedCommentData);
  return res.data;
};

export const deleteComment = async (id, tno, commentId, pwData) => {
  try {
    console.log('Password Data:', pwData);
    const res = await axios.delete(`${prefix}/categories/${id}/contents/${tno}/comments/${commentId}`, { data: pwData });
    return res.data;
  } catch (error) {
    console.error("deleteComment error:", error);
    throw error;
  }
};
