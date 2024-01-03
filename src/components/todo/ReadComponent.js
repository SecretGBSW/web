  import { useEffect, useState } from "react"
  import { useParams } from "react-router-dom"
  import  {getOne} from "../../api/todoApi"
  import useCustomMove from "../hooks/useCustomMove"

  const initState = {
    tno:0,
    title:'',
    writer: '',
    content: '',
    password: ''
  }

  const ReadComponent = () => {
    const {id,tno} = useParams();
    const [todo, setTodo] = useState(initState) //아직 todo는 사용하지 않음 
    
    const {moveToList, moveToModify} = useCustomMove()  

    useEffect(() => {
      getOne(id,tno).then(data => {
        console.log(data)
        setTodo(data.data)
      })    
    }, [tno])

    return (  
    <div className = "border-2 border-sky-200 mt-10 m-2 p-4 ">
        
      {makeDiv('Writer', todo.writer)}
      {makeDiv('Title', todo.title)}
      {makeDiv('Content', todo.content)}
      {makeDiv('Password', todo.password)}

      {/* buttons.........start */}
      <div className="flex justify-end p-4">

        <button type="button" 
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}
        >
          List
        </button>

        <button type="button" 
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={() => moveToModify(tno)}
        >
          Modify
        </button>
      </div>
    </div>
    )
  }

  const makeDiv = (title,value) =>       
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{value}</div>
    </div>
  </div>

  
  export default ReadComponent