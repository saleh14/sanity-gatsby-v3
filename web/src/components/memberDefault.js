import { useAuth } from '@nhost/react-auth'
import { useQuery } from 'urql'

import { auth } from '../lib/nhost'
import React, { useContext, useEffect, useState } from 'react'
// import { MemberContext } from '../lib/MemberContext'
// import Login from './login'

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
          id
        }
      }
    }
  }
`

function MemberDefault() {
  return <div> testing login</div>
  // const { signedIn } = useAuth()
  // const { updateAuth, logout } = useContext(MemberContext)
  // const [loading, setLoading] = useState(true)
  // const [result, refetch] = useQuery({ query: GET_MEMBERSHIP_COURSE_QUERY })
  // const { data, fetching, error } = result
  // useEffect(() => {
  //   setTimeout(async () => {
  //     await new Promise(r => setTimeout(r, 100))
  //     if (signedIn) updateAuth(auth)
  //     else updateAuth(null)
  //     await new Promise(r => setTimeout(r, 300))
  //     setLoading(false)
  //   })
  // }, [signedIn])
  // console.log(auth.user())
  // const logoutButton = <button onClick={() => logout()}>Logout</button>
  // if (loading) return <div></div>
  // if (!signedIn) return <Login />
  // if (fetching) return <div>Loading..</div>
  // if (error) {
  //   console.error(error)
  //   setTimeout(() => {
  //     refetch()
  //   }, 100)
  // }
  // return (
  //   <div>
  //     <div>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>
  //   </div>
  // )
}
export default MemberDefault
