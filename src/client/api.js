export const saveTask = (task) => {
  return fetch('/api/tasks', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(task)
  }).then(res => res.json())
}

export const patchTask = (task) => {
  return fetch(`/api/tasks/${task.id}`, {
    method: 'PATCH',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(task)
  }).then(res => res.json())
}


export const getTasks = () => {
  return fetch('/api/tasks').then(res => res.json())
}

export const getProjects = () => {
  return fetch('/api/projects').then(res => res.json())
}
