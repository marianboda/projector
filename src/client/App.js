import React from 'react'
import { observer } from 'mobx-react'
import uuid from 'uuid'
import { BrowserRouter, HashRouter, Link, Match } from 'react-router'

import TasksPage from './pages/TasksPage'
import ProjectsPage from './pages/ProjectsPage'
import { getData } from './store'

import './app.sass'

class App extends React.Component {
  componentWillMount() {
    getData()
  }

  render() {
    return (
      <HashRouter>
        <div className="appContainer">
          <div className="appHeader">
            <ul className="top-menu">
              <li><Link to="/tasks">Tasks</Link></li>
              <li><Link to="/projects">Projects</Link></li>
            </ul>
          </div>
          <div className="appContent">
            <Match pattern="/tasks" component={TasksPage} />
            <Match pattern="/projects" component={ProjectsPage} />
          </div>
        </div>
      </HashRouter>
    )
  }
}

export default observer(App)
