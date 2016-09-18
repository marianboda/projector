import React from 'react'
import { observer } from 'mobx-react'
import uuid from 'uuid'

import TaskList from './TaskList'

import { AppState, getData, addTask } from './store'

const keyPressHandler = (e) => {
  if (e.charCode == 13) {
    addTask(e.target.value)
    e.target.value = ''
  }
}

class App extends React.Component {
  componentWillMount() {
    getData()
  }

  projectChangeHandler(e) {
    AppState.currentProject = e.target.value
  }
  render() {
    const pId = AppState.currentProject
    return (<div>
        <h1>Tasks</h1>
          <select onChange={this.projectChangeHandler} value={pId}>
            <option value="0">-- ALL ---</option>
            {AppState.projects.map((p) => <option value={p.id}>{p.name}</option>)}
          </select>
          <br></br>
          <input type="text" onKeyPress={keyPressHandler} />
        <TaskList tasks={
            AppState.taskList.map(i => AppState.tasks[i])
              .filter(i => pId == 0 || i.projectId == pId)
            }/>
      </div>
    )
  }
}

export default observer(App)
