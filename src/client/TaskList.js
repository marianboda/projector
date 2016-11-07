import React from 'react'

const TaskList = ({tasks, onCheck, onSelect}) => (
  <div className="task-list">
    <ul>
      {
        tasks.map(i => {
          const checked = (i.state == 1)
          return (
            <li key={i.id}>
              <input type="checkbox" checked={checked} onChange={() => onCheck({...i, state: (i.state == 1) ? 0 : 1})} />
              <span onClick={onSelect}>{i && i.name ? i.name : '-'}</span>
            </li>
          )
        })
      }
    </ul>
  </div>
)

export default TaskList
