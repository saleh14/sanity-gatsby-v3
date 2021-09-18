import { useMutation, useQuery } from 'urql'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'gatsby'
import MembershipField from './membershipField'

const GET_USER_DETAIL = `
  query userDetail {
    users {
      display_name
      id
      gender
      mobile
      city
      current_job
      user_members {
        membership {
          type
          id
        }
      }
    }
  }
`
const UPDATE_USER_DETAIL = `
  mutation updateUser($id: uuid!,$display_name: String, $gender: String, $mobile: Int, $city: String, $current_job: String) {
    update_users_by_pk(
      pk_columns: {id: $id},
      _set: {display_name: $display_name, gender: $gender, mobile: $mobile, current_job: $current_job, city: $city}
    )
    {
      id
      display_name
      gender
    }
  }
`

const insert_user_membership = `
 mutation updateMember($membership:String!){
  insert_user_member_one(object:{ membership_id:$membership}){
    membership_id
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

const delayGen = () => {
  let time = 0
  return (callback, ms = 1000) => {
    clearTimeout(time)
    time = setTimeout(callback, ms)
  }
}
const delay = delayGen()

function MembershipForm() {
  const [result, refetch] = useQuery({ query: GET_USER_DETAIL })
  const [updateFields, updateData] = useMutation(UPDATE_USER_DETAIL)
  const { data, fetching, error } = result
  const [unupdated, setUnupdated] = useState({})
  useEffect(() => {
    if (Object.keys(unupdated).length === 0) return
    delay(async () => {
      await refetch()
      console.log(data)
      const { users = [] } = data
      const { __typename, id, user_members, ...fields } = users.length ? users[0] : {}
      const variable = { ...fields, ...unupdated }
      console.log(variable)
      await updateData({ id, ...variable })
      setUnupdated({})
    }, 1200)
  }, [unupdated])

  const handleForm = e => {
    const { name, value } = e.target
    setUnupdated({ ...unupdated, [name]: value })
  }
  if (fetching) return <LoadingSuspend />
  if (error) {
    console.error(error)
    setTimeout(() => {
      refetch()
    }, 1000)
  }
  const { users = [] } = data
  const { __typename, id, user_members = [], ...fields } = users.length ? users[0] : {}
  return (
    <div>
      <Link to="/member/join">Join</Link>
      <div>
        {users.length && (
          <form>
            <MembershipField membership={user_members[0] && user_members[0].membership} />
            {Object.entries(fields)
              .filter(([field, value]) => Array.isArray(value) === false)
              .map(([field, value]) => (
                <input
                  key={field}
                  onChange={handleForm}
                  placeholder={field}
                  name={field}
                  defaultValue={value || ''}
                />
              ))}
          </form>
        )}
        <pre>{JSON.stringify(unupdated, null, 2)}</pre>
      </div>
    </div>
  )
}
export default MembershipForm
