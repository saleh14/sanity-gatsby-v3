import { Link } from 'gatsby'
import React, { useContext, useEffect, useState } from 'react'
import Icon from './icon'
import { cn } from '../lib/helpers'

import * as styles from './header.module.css'
import { MemberContext } from '../lib/MemberContext'

const Header = ({ onHideNav, onShowNav, showNav, siteTitle }) => {
  const { auth, logout } = useContext(MemberContext)

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <Link to="/">{siteTitle}</Link>
          {auth && auth?.user?.() && (
            <div>
              <button onClick={() => logout()}>log me out</button>{' '}
              <h3>{auth?.user?.()?.display_name}</h3>{' '}
            </div>
          )}
        </div>

        <button className={styles.toggleNavButton} onClick={showNav ? onHideNav : onShowNav}>
          <Icon symbol="hamburger" />
        </button>

        <nav className={cn(styles.nav, showNav && styles.showNav)}>
          <ul>
            <li>
              <Link to="/archive/">Archive</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
export default Header
