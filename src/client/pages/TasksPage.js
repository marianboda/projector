import React from 'react'
import { observer } from 'mobx-react'

import { AppState, getData, saveTask } from '../store'
import TaskList from '../TaskList'
import TaskEditor from '../components/TaskEditor'

function keyPressHandler() {}

const changeHandler = (change) => {
  AppState.currentTask = {...AppState.currentTask, ...change}
}

class TasksPage extends React.Component {
  projectChangeHandler(e) {
    AppState.currentProject = e.target.value
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
            <hr />
          <TaskEditor data={AppState.currentTask}
             projects={AppState.projects}
             changeHandler={changeHandler}
             saveHandler={() => saveTask(AppState.currentTask)}/>
          <TaskList tasks={
              AppState.taskList.map(i => AppState.tasks[i])
                .filter(i => pId == 0 || pId == i.projectId)
              }/>
        </div>
    )
  }
}

export default observer(TasksPage)
