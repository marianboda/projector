import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import uuid from 'uuid'

import * as Api from './api'
import TaskList from './TaskList'

const AppState = observable({
  currentProject: 0,
  tasks: {},
  projects: [],
  taskList: []
})

async function getTasks() {
  const rawTasks = await Api.getTasks()
  AppState.taskList = []
  AppState.tasks = rawTasks.reduce((acc, el) => ({[el.id]: el, ...acc}),{})
  AppState.taskList = rawTasks.map(i => i.id)
}

async function getProjects() {
  AppState.projects = await Api.getProjects()
  // const rawProjects = await Api.getProjects()
  // AppState.projects = rawProjects.reduce((acc, el) => ({[el.id]: el, ...acc}),{})
}

const addTask = async (name) => {
  await Api.addTask({name, projectId: AppState.currentProject})
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
    getProjects()
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
