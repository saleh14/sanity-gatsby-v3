import React, { useEffect, useState } from 'react'

const MembershipField = ({ membership }) => {
  const [mode, setMode] = useState('display')
  const { id, type } = membership || {}
  const [regularChecked, setRegularChecked] = useState(false)
  const [workerChecked, setWorkerChecked] = useState(false)
  useEffect(() => {
    const { type } = membership || {}
    if (type === 'regular') setRegularChecked(true)
    if (type === 'worker') setWorkerChecked(true)
  }, [membership])
  const membershipDescription = { regular: 'عضو منتسب', worker: 'عضو عامل' }
  const handleRadio = e => {
    console.log(e.target.value)
  }
  return (
    <div>
      <b>نوع العضوية </b>

      {mode === 'edit' || typeof type !== 'string' ? (
        <>
          <label htmlFor="regular">عضو منتسب</label>
          <input
            type="radio"
            id="regular"
            name="membershipField"
            defaultChecked={regularChecked}
            onChange={handleRadio}
            value="regular"
          />
          <label htmlFor="worker">عضو عامل</label>
          <input
            type="radio"
            id="worker"
            name="membershipField"
            defaultChecked={workerChecked}
            onChange={handleRadio}
            value="worker"
          />
        </>
      ) : (
        <b>{membershipDescription[type] || 'غير محدد'}</b>
      )}
      {typeof type === 'string' && (
        <button
          onClick={e => {
            e.preventDefault()
            if (mode === 'edit') setMode('display')
            else setMode('edit')
          }}
        >
          {mode === 'edit' ? <b> حفظ </b> : <b>تغيير</b>}
        </button>
      )}
    </div>
  )
}
export default MembershipField
