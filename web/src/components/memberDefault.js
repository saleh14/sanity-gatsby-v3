
import { useAuth } from "@nhost/react-auth"
import { auth } from "../lib/nhost"
import React, { useContext, useEffect, useState } from "react"
import { MemberContext } from "../lib/MemberContext"
import Login from "./login"

function MemberDefault() {
  const { signedIn } = useAuth()
  const { logout } = useContext(MemberContext)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(async () => {
      await new Promise(r => setTimeout(r, 500))
      setLoading(false)
    })
  }, [])
  const logoutButton = <button onClick={logout} >Logout</button>
  return <div>
    {!loading ? signedIn ? logoutButton : <Login /> : <div></div>}
  </div>
}
export default MemberDefault