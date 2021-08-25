import { navigate } from '@reach/router'
import React, { useContext, useState } from 'react'
import { MemberContext } from '../lib/MemberContext'
import { auth } from '../lib/nhost'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { updateAuth } = useContext(MemberContext)

  async function handleSubmit(e) {
    e.preventDefault()
    // login
    try {
      await auth.login({ email, password })
      updateAuth(auth)
    } catch (error) {
      alert('error logging in')
      console.error(error)
      updateAuth(null)
      return
    }
    // if (typeof window !== undefined)
    //   navigate(-1)
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  )
}
export default Login
