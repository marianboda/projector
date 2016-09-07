import React from 'react'

const TaskList = ({tasks}) => (
  <ul>
    {
      tasks.map(i => <li>{i && i.name ? i.name : '-'}</li>)
    }
  </ul>
)

export default TaskList
