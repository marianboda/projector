import React from 'react'

const TaskEditor = (props) => {
  const { data, projects } = props
  const change = props.changeHandler

  return (<div>
    <select onChange={(e) => change({projectId: e.target.value})}
        value={data.projectId}>
      <option value="0">-- ALL ---</option>
      {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
    </select>
    <br />
    <input type="text" onChange={(e) => change({name: e.target.value})} />
    <br />
    <button onClick={props.saveHandler}>SAVE</button>
  </div>)
}

export default TaskEditor
