import axios from "axios"

//서버 주소
export const API_SERVER_HOST = 'http://172.16.1.196:8097'

const prefix = `${API_SERVER_HOST}`

export const getOne = async (tno) => {
  const res = await axios.get(`${prefix}/categories/${tno}/contents` )

  return res.data 
}

export const getList = async ( pageParam ) => {
  const res = await axios.get(`${prefix}/categories/${pageParam.id}/contents`)
  return res.data
}

export const postAdd = async ( pageParam,todo ) => {
  console.log(todo)
  const res = await axios.post(`${prefix}/categories/${pageParam}/contents/add` , {
    title:todo.title,
    writer:todo.writer,
    content:todo.content,
    password:todo.password
  })

  return res.data
} 

export const deleteOne = async (tno) => {
  const res = await axios.delete(`${prefix}/${tno}`)

  return res.data
}

export const putOne = async (todo) => {
  const res = await axios.put(`${prefix}/${todo.tno}`, todo)

  return res.data
}

