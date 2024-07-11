import { useEffect, useState } from 'react'
import { fetchPosts } from '../context/api'

export default function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getPosts() {
      const data = await fetchPosts()
      setPosts(data)
    }
    getPosts()
  }, [])

  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
