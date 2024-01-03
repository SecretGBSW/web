import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne, getComments, createComment, deleteComment } from "../../api/todoApi";
import useCustomMove from "../hooks/useCustomMove";

const initState = {
  tno: 0,
  title: '',
  writer: '',
  content: '',
  password: ''
}

const ReadComponent = () => {
  const { id, tno } = useParams();
  const [todo, setTodo] = useState(initState);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    title: '',
    writer: '',
    content: '',
    pw: ''
  });

  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(id, tno).then(data => {
      setTodo(data.data);
    });

    getComments(id, tno).then(commentData => {
      console.log('Comments Data:', commentData); // 콘솔 출력
      setComments(commentData);
    });
  }, [id, tno]);

  const addComment = async () => {
    try {
      console.log('New Comment Data:', newComment); // 콘솔 출력
      const response = await createComment(id, tno, newComment);
      setComments(prevComments => [...prevComments, response]);
      setNewComment({
        title: '',
        writer: '',
        content: '',
        pw: ''
      });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const removeComment = async (commentId) => {
    console.log('Removing Comment with ID:', commentId); // 콘솔 출력
    try {
      await deleteComment(id, tno, commentId, { pw: newComment.pw });
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const makeDiv = (title, value) => (
    <div className="flex justify-center">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">{title}</div>
        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {makeDiv('Writer', todo.writer)}
      {makeDiv('Title', todo.title)}
      {makeDiv('Content', todo.content)}
      {makeDiv('Password', todo.password)}

      <div className="mt-4">
        <h2 className="text-lg font-semibold">댓글 목록</h2>
        <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            {JSON.stringify(comment)}{' '}
            <button onClick={() => removeComment(comment.id)}>삭제</button>
          </li>
        ))}
      </ul>
      </div>

      <div className="mt-4">
        <div>
          <input
            type="text"
            placeholder="댓글 제목"
            value={newComment.title}
            onChange={(e) => setNewComment(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="댓글 작성자"
            value={newComment.writer}
            onChange={(e) => setNewComment(prev => ({ ...prev, writer: e.target.value }))}
          />
        </div>
        <div>
          <textarea
            placeholder="댓글 내용"
            value={newComment.content}
            onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
          />    
        </div>
        <div>
          <input
            type="password"
            placeholder="댓글 비밀번호"
            value={newComment.pw}
            onChange={(e) => setNewComment(prev => ({ ...prev, pw: e.target.value }))}
          />
        </div>
        <button onClick={addComment}>댓글 작성</button>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}
        >
          List
        </button>

        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={() => moveToModify(tno)}
        >
          Modify
        </button>
      </div>
    </div>
  );
};

export default ReadComponent;