import axios from "axios"

//서버 주소
export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}`

export const getOne = async (tno) => {
  const res = await axios.get(`${prefix}/${tno}` )

  return res.data
}

export const getList = async ( pageParam ) => {
  console.log(pageParam.id)
  const res = await axios.get(`${prefix}/${pageParam.id}/content`)
  return res.data
}

export const postAdd = async (todoObj) => {
  const res = await axios.post(`${prefix}/` , todoObj)

  return res.data
}

export const deleteOne = async (tno) => {
  const res = await axios.delete(`${prefix}/${tno}` )

  return res.data
}

export const putOne = async (todo) => {
  const res = await axios.put(`${prefix}/${todo.tno}`, todo)

  return res.data
}