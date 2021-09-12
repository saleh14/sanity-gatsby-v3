import { useAuth } from '@nhost/react-auth'
import { auth } from '../../lib/nhost'
import React, { useContext, useEffect, useState } from 'react'
import { MemberContext } from '../../lib/MemberContext'
import Login from '../login'
function AuthGate({ children }) {
  const { signedIn } = useAuth()
  const { updateAuth } = useContext(MemberContext)
  useEffect(() => {
    setTimeout(async () => {
      await new Promise(r => setTimeout(r, 10))
      if (signedIn) updateAuth(auth)
      else updateAuth(null)
    })
  }, [signedIn])
  if (signedIn === null) return <div></div>
  if (!signedIn) return <Login />
  return children
}
export default AuthGate
