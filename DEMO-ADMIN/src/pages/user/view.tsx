import axios from 'axios'
import React, { useState } from 'react'

export default function view() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [empData, setEmpData] = useState<any>({})

  const getTodo = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:1000/todo/list/${id}`)
      setEmpData(response.data)

      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <div className='card'>
        <div className='card-title'>
          <h1>Employee Lists</h1>

          {<h1>This is todo title:-- {empData.todo}</h1>}

          <button className='btn btn-primary me-3' onClick={(id: any) => getTodo(id)}>
            View
          </button>
        </div>
      </div>
    </div>
  )
}
