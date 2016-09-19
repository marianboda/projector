import { observable } from 'mobx'

import * as Api from './api'

export const AppState = observable({
  currentProject: 0,
  tasks: {},
  projects: [],
  taskList: []
})

export async function getTasks() {
  const rawTasks = await Api.getTasks()
  AppState.taskList = []
  AppState.tasks = rawTasks.reduce((acc, el) => ({[el.id]: el, ...acc}),{})
  AppState.taskList = rawTasks.map(i => i.id)
}

export async function getProjects() {
  AppState.projects = await Api.getProjects()
}

export const addTask = async (name) => {
  await Api.addTask({name, projectId: AppState.currentProject})
  await getTasks()
}

export function getData() {
  getTasks()
  getProjects()
}
