import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import uuid from 'uuid'

import * as Api from './api'
import TaskList from './TaskList'

const AppState = observable({
  tasks: {},
  projects: {},
  taskList: []
})

async function getTasks() {
  const rawTasks = await Api.getTasks()
  AppState.taskList = []
  AppState.tasks = rawTasks.reduce((acc, el) => ({[el.id]: el, ...acc}),{})
  AppState.taskList = rawTasks.map(i => i.id)
}

const addTask = async (name) => {
  await Api.addTask({name, projectId: 0})
  await getTasks()
}

const keyPressHandler = (e) => {
  if (e.charCode == 13) {
    addTask(e.target.value)
    e.target.value = ''
  }
}

class App extends React.Component {
  componentWillMount() {
    getTasks()
  }
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
