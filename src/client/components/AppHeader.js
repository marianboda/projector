import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router'

import { AppState } from '../store'

class AppHeader extends React.Component {
  render() {
    const { current, menuItems } = this.props
    return (
      <div className="appHeader">
        <ul className="top-menu">
          {
            menuItems.map((i) => {
              const link = i.title.toLowerCase()
              return (
                <li key={i.title}><Link className={link == current ? 'active' : ''} to={link}>{i.title}</Link></li>
              )
            })
          }
          <li key="google"><a href="/connect/google">Google</a></li>
        </ul>
        <img style={{width: 32, height: 32}} src={AppState.session.picture} />
      </div>
    )
  }
}

export default observer(AppHeader)
