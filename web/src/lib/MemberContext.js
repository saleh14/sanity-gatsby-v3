import React from 'react'

export const MemberContext = React.createContext(null);

export const ProviderWrapper = ({ children }) => {
  const [auth, setAuth] = React.useState(null)
  function updateAuth(_auth) {
    setAuth(_auth)
  }
  async function logout() {
    if (!auth)
      throw Error('auth has not been initialized')

    await auth.logout()
    setAuth(null)
  }
  return <MemberContext.Provider value={{ auth, updateAuth, logout }}>
    {children}
  </MemberContext.Provider >
}