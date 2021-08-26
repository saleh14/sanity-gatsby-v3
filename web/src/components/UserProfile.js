import { useQuery } from 'urql'
import { auth } from '../lib/nhost'
import React, { useContext, useEffect, useState } from 'react'
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

function LoadingSuspend() {
  const [show, setShow] = useState([false, false, false])
  const sleep = (delay = 1000) => new Promise(r => setTimeout(r, delay))
  useEffect(() => {
    setTimeout(async () => {
      await sleep(300)
      setShow([true, false, false])
      await sleep(400)
      setShow([false, true, false])
      await sleep(500)
      setShow([false, false, true])
    })
  }, [])

  if (show?.[0]) return <div>Loading.</div>
  if (show?.[1]) return <div>Loading..</div>
  if (show?.[2]) return <div>Loading...</div>
  return <div></div>
}

function UerProfile() {
  const [result, refetch] = useQuery({ query: GET_MEMBERSHIP_COURSE_QUERY })
  const { data, fetching, error } = result
  if (fetching) return <LoadingSuspend />
  if (error) {
    console.error(error)
    setTimeout(() => {
      refetch()
    }, 1000)
  }
  return (
    <div>
      <div>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>
    </div>
  )
}
export default UerProfile
