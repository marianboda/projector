import React from 'react'

const TaskList = ({tasks}) => (
  <ul>
    {
      tasks.map(i => <li>{i.name}</li>)
    }
  </ul>
)

export default TaskList
