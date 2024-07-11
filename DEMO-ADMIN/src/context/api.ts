// import axios from 'axios'

export async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await res.json()

  return data
}

// export const addUser = async () => {
//   await axios.post('http://localhost:8000/admin/auth/signUp').then(res => {
//     res.data
//     console.log(res.data)
//   })
// }
