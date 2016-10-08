import React from 'react'
import { Link } from 'react-router'

class AppHeader extends React.Component {
  render() {
    const { current, menuItems } = this.props
    return (
      <div className="appHeader">
        <ul className="top-menu">
          {
            menuItems.map((i) => {
              const link = i.title.toLowerCase()

              console.log(current, link)
              return (
                <li key={i.title}><Link className={link == current ? 'active' : ''} to={link}>{i.title}</Link></li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default AppHeader
