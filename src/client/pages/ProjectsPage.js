import React from 'react'
import { observer } from 'mobx-react'

import { AppState } from '../store'

class ProjectsPage extends React.Component {
  render() {
    return (
      <div>
        <ul>
          { AppState.projects.map(i => <li key={i.id}>{i.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default observer(ProjectsPage)
