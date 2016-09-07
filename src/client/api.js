export const addTask = (task) => {
  const headers = new Headers({'Content-Type': 'application/json'})

  return fetch('/tasks', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(task)
  }).then(res => res.json())
}

// export addTask
