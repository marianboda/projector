import React from 'react'

const TaskList = ({tasks}) => (
  <div className="task-list">
    <ul>
      {
        tasks.map(i => <li key={i.id}><input type="checkbox" />{i && i.name ? i.name : '-'}</li>)
      }
    </ul>
  </div>
)

export default TaskList
