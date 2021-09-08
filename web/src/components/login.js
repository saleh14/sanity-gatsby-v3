import { navigate } from '@reach/router'
import React, { useContext, useState } from 'react'
import { MemberContext } from '../lib/MemberContext'
import { auth } from '../lib/nhost'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const { updateAuth } = useContext(MemberContext)
  const [isNewUser, setIsNewUser] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    // login
    try {
      if (isNewUser)
        await auth.register({
          email,
          password,
          options: { userData: { display_name: fullName }, allowedRoles: ['user', 'me'] },
        })
      else await auth.login({ email, password })
      updateAuth(auth)
    } catch (error) {
      alert('error logging in')
      console.error(error)
      updateAuth(null)
      try {
        auth.logout()
      } catch (e) {
        console.log({ e })
      }
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
        {isNewUser && (
          <input
            placeholder="Full Name.. e.g: Saleh Ali"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        )}
        <button>{isNewUser ? 'Register' : 'Login'}</button>
      </form>
      <label htmlFor="isNew"> Register </label>
      <input id="isNew" type="checkbox" onChange={() => setIsNewUser(checked => !checked)} />
    </div>
  )
}
export default Login
