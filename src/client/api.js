export const saveTask = (task) => {
  return fetch('/tasks', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(task)
  }).then(res => res.json())
}

export const getTasks = () => {
  return fetch('/tasks').then(res => res.json())
}

export const getProjects = () => {
  return fetch('/projects').then(res => res.json())
}
