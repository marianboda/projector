import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import uuid from 'uuid'

import TaskList from './TaskList'

const AppState = observable({
  tasks: {
    "1": {"name": "Implement scanning", "projectId": 2},
    "2": {"name": "Implement review", "projectId": 2}
  },
  projects: {
    "1": {"name": "Petrzka"},
    "2": {"name": "Photor"}
  },
  taskList: ['2','1']
})

const addTask = (name) => {
  const id = uuid.v1()
  AppState.tasks[id] = {name, projectId: 0}
  AppState.taskList.push(id)
}

const keyPressHandler = (e) => {
  if (e.charCode == 13) {
    addTask(e.target.value)
    e.target.value = ''
  }
}

class App extends React.Component {
  render() {
    console.log('rendering', AppState)
    return (<div>
        <h1>Application up and running + </h1>
        <TaskList tasks={AppState.taskList.map(i => AppState.tasks[i])}/>
        <input type="text" onKeyPress={keyPressHandler} />
      </div>
    )

  }
}

export default observer(App)
