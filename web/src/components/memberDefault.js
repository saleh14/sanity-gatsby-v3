import { useAuth } from '@nhost/react-auth'
import { useQuery } from 'urql'

import { auth } from '../lib/nhost'
import React, { useContext, useEffect, useState } from 'react'
import { MemberContext } from '../lib/MemberContext'
import Login from './login'

const GET_MEMBERSHIP_COURSE_QUERY = `
  query get_course_membership {
    users {
      user_members {
        membership {
          type
        }
      }
      user_courses {
        course {
          name
        }
      }
    }
  }
`

function MemberDefault() {
  const [result, refetch] = useQuery({ query: GET_MEMBERSHIP_COURSE_QUERY })
  const { data, fetching, error } = result
  const { signedIn } = useAuth()
  const { updateAuth, logout } = useContext(MemberContext)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(async () => {
      await new Promise(r => setTimeout(r, 500))
      setLoading(false)
      if (signedIn !== null) updateAuth(auth)
    })
  }, [signedIn])
  console.log(auth.user())
  const logoutButton = <button onClick={() => logout()}>Logout</button>
  if (fetching) return <div>Loading..</div>
  if (!signedIn) return <Login />
  if (error) {
    console.error(error)
    setTimeout(() => {
      refetch()
    }, 100)
  }
  return (
    <div>
      <div>
        {fetching && <pre>Loading</pre>}
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  )
}
export default MemberDefault
