import styled from './Menu.module.css'
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      카테고리 골라
      <div className={styled.container}>
        <Link to={'1/contents'} className={styled.stu}>학생</Link>
        <Link to={'2/contents'} className={styled.th}>교사</Link>
      </div>
      <div div className={styled.container1}>
        <Link to={'3/contents'}className={styled.Adm}>행정실</Link>
        <Link to={'4/contents'} className={styled.talk}>잡담</Link>
      </div>
    </div>
  );
}

export default Menu;