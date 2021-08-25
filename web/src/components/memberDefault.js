
import { useAuth } from "@nhost/react-auth"
import { useQuery, gql } from "@apollo/client";

import { auth } from "../lib/nhost"
import React, { useContext, useEffect, useState } from "react"
import { MemberContext } from "../lib/MemberContext"
import Login from "./login"


const GET_MEMBERSHIP_COURSE_QUERY = gql`
  query get_course_membership {
    users {
      user_members {
        membership {
          type
        }
      }
      user_courses{
        course{
          name
        }
      }
    }
  }
`;

function MemberDefault() {
  const { data, error, loading: queryLoading } = useQuery(GET_MEMBERSHIP_COURSE_QUERY)
  const { signedIn } = useAuth()
  const { updateAuth, logout } = useContext(MemberContext)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(async () => {
      await new Promise(r => setTimeout(r, 500))
      setLoading(false)
      if (signedIn)
        updateAuth(auth)
    })
  }, [signedIn])
  console.log(auth.user())
  const logoutButton = <button onClick={() => logout()} >Logout</button>
  return <div>
    {!loading ? signedIn ? logoutButton : <Login /> : <div></div>}
    {
      !loading & signedIn ? (
        < div >
          {
            queryLoading && <pre>Loading</pre>}
          {
            error && <pre>
              Error in GET_MEMBERSHIP_QUERY
              {JSON.stringify(error, null, 2)}
            </pre>

          }
          {
            data && <pre>{JSON.stringify(data, null, 2)}</pre>
          }

        </div>
      ) : null
    }
  </div>
}
export default MemberDefault