import { observable, toJS } from 'mobx'

import * as Api from './api'

const initProject = localStorage.getItem('currentProject')

const getBlankTask = () => ({
  projectId: 0,
  state: 0,
  name: '',
})

export const AppState = observable({
  currentProject: initProject ? initProject : 0,
  tasks: {},
  session: {},
  projects: [],
  taskList: [],
  currentTask: {
    projectId: initProject ? initProject : 0,
    state: 0,
    name: '',
  }
})

export async function getTasks() {
  const rawTasks = await Api.getTasks()
  AppState.taskList = []
  AppState.tasks = rawTasks.reduce((acc, el) => ({[el.id]: el, ...acc}), {})
  AppState.taskList = rawTasks.map(i => i.id)
}

export async function getSessionInfo() {
  const session = await Api.getSessionInfo()
  AppState.session = session
}

export async function getProjects() {
  AppState.projects = await Api.getProjects()
}

export const saveTask = async (task) => {
  const snapshot = toJS(task)
  AppState.currentTask.name = ''
  await Api.saveTask(snapshot)
  await getTasks()
}

export function getData() {
  getSessionInfo()
  // getTasks()
  // getProjects()
}
