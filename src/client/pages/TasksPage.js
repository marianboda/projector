import React from 'react'
import { observer } from 'mobx-react'

import { AppState, getData, addTask } from '../store'

import TaskList from '../TaskList'

function keyPressHandler() {}

class TasksPage extends React.Component {
  projectChangeHandler(e) {
    AppState.currentProject = e.target.value
  }
  keyPressHandler = (e) => {
    if (e.charCode == 13) {
      addTask(e.target.value)
      e.target.value = ''
    }
  }

  render() {
    const pId = AppState.currentProject
    return (
        <div>
          <h2>Tasks</h2>
            <select onChange={this.projectChangeHandler} value={pId}>
              <option value="0">-- ALL ---</option>
              {AppState.projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <br></br>
            <input type="text" onKeyPress={this.keyPressHandler} />
          <TaskList tasks={
              AppState.taskList.map(i => AppState.tasks[i])
                .filter(i => pId == 0 || i.projectId == pId)
              }/>
        </div>
    )
  }
}

export default observer(TasksPage)
