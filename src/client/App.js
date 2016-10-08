import React from 'react'
import { observer } from 'mobx-react'
import uuid from 'uuid'
import { Link, Match } from 'react-router'

import AppHeader from './components/AppHeader'
import TasksPage from './pages/TasksPage'
import ProjectsPage from './pages/ProjectsPage'
import { getData } from './store'

import './app.sass'

const menuItems = [
  {
    title: 'Tasks'
  },
  {
    title: 'Projects'
  }
]

class App extends React.Component {
  componentWillMount() {
    getData()
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    return (
      <div className="appContainer">
        <AppHeader menuItems={menuItems} current={location.hash.substr(2)} />
        <div className="appContent">
          <Match pattern="/tasks" component={TasksPage} />
          <Match pattern="/projects" component={ProjectsPage} />
        </div>
      </div>
    )
  }
}

export default observer(App)
