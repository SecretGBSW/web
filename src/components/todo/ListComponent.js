import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getList } from "../../api/todoApi";
import useCustomMove from "../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";

const initState = {
  dtoList:[],
  pageNumList:[],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0
}

const ListComponent = () => {
  const {id} = useParams();
  const {page, size, refresh, moveToList, moveToRead} = useCustomMove()//refresh

  //serverData는 나중에 사용
  const [serverData, setServerData] = useState(initState)


  useEffect(() => {

    getList({id}).then(data => {
      // console.log(data.data)·/
      setServerData({
        ...initState,
        dtoList: data.data,
      });
    })

  }, [id, page,size, refresh])

  return ( 
    <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
  
      <div className="flex flex-wrap mx-auto justify-center p-6">
        {serverData.dtoList.map((todo,idx) => {
          console.log(todo)
          return(
          <div
          key= {todo.id} 
          className="w-full min-w-[400px]  p-2 m-2 rounded shadow-md"
          onClick={() => moveToRead(todo.id)} 
          >
            <div className="flex">
              <div className="font-extrabold text-2xl p-2 w-1/12">
                {idx + 1}
              </div>
              <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                {todo.title}
              </div>
              <div className="text-1xl m-1 p-2 w-2/10 font-medium">
                {todo.writer}
              </div>
            </div>
          </div>
          )
        })
        }
      </div>

      <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
  
    </div>
  
    );
  
}
 
export default ListComponent;