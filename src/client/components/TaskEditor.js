import React from 'react'

const TaskEditor = (props) => {
  const { data, projects } = props
  const change = props.changeHandler

  const projectSelector = (<tr>
      <td>Project</td>
      <td>
        <select onChange={(e) => change({projectId: e.target.value})} value={data.projectId}>
          <option value="0">-- ALL ---</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </td>
    </tr>
  )
  return (<div className="editor">
    <table>
      <tbody>
        { (data.id) ? projectSelector : null }
        <tr>
          <td>Task</td>
          <td>
            <input type="text" onChange={(e) => change({name: e.target.value})}
              value={data.name}
              onKeyDown={(e, v) => e.key == 'Enter' ? props.saveHandler(e) : null}/>
          </td>
        </tr>
        <tr>
          <td></td>
          <td><button onClick={props.saveHandler}>SAVE</button></td>
        </tr>
      </tbody>
    </table>
  </div>)
}

export default TaskEditor
