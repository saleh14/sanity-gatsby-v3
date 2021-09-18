import { Link } from 'gatsby'
import { auth } from '../lib/nhost'
import { Router } from '@reach/router'
import React, { useEffect, useState } from 'react'
import LayoutContainer from '../containers/layout'
import Container from './container'
import * as styles from './membership.module.css'
import AuthGate from './privateRoutes/auth-gate'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { NhostUrqlProvider } from '../lib/NhostUrqlProvider'
import { NhostAuthProvider, useAuth } from '@nhost/react-auth'
import Login from './login'
import UserProfile from './privateRoutes/UserProfile'
import MembershipForm from './privateRoutes/membership-form'

const membershipData = [
  {
    title: 'عامل',
    fee: '100',
    description:
      'ويحق للعضو العامل الترشح لمجلس إدارة الجمعية. كما يحق للعضو العامل المشاركة في أنشطة الجمعية والاستفادة التامة من الوسائل المتوفرة. كما يستفيد من الخصومات والتسهيلات التي توفرها الجمعية. ويلزم تعبئة نموذج طلب العضوية.',
  },
  {
    title: 'منتسب',
    fee: '',
    description:
      'وهم الأعضاء ذوي التخصص والاهتمام الذين يتواصلون مع الجمعية بصورة دائمة من قريب أو بعيد. ولا يلزم العضو المنتسب بدفع أي رسوم وإنما هو أمر اختياري للعضو المنتسب.',
  },
]

const PreSignUP = () => {
  const { signedIn } = useAuth()
  const [state, setState] = useState(false)
  const [show, setShow] = useState(true)
  useEffect(() => {
    setTimeout(async () => {
      if (state === 'hide') setShow(false)
    }, 333)
  }, [state])
  console.log({ signedIn })
  if (signedIn || signedIn === null) return null
  return (
    <>
      {show && (
        <div data-hide={state} className={styles.preSignup}>
          <div>
            <b>الخطوة الأولى </b>
            إنشاء حساب لك
          </div>
          <button data-testid="prenext" onClick={() => setState('hide')}>
            إغلاق
          </button>
        </div>
      )}
    </>
  )
}

const Membership = () => {
  const [showNextStep, setShowNextStep] = useState(false)
  return (
    <LayoutContainer>
      <Container>
        <div className={styles.wrap}>
          <h1>العضويات المتاحة:</h1>
          {membershipData.map(item => (
            <div className={styles.card}>
              <h3>{item.title}</h3>
              <small>{item.description}</small>
              <b>{item.fee ? `${item.fee} ريال` : 'مجانا'}</b>
            </div>
          ))}
          <NhostAuthProvider auth={auth}>
            <NhostUrqlProvider
              auth={auth}
              gqlEndpoint="https://hasura-86297f6e.nhost.app/v1/graphql"
            >
              <section>
                {showNextStep && <PreSignUP />}
                {showNextStep === false ? (
                  <h3 className={styles.cta}>
                    <a data-testid="next" onClick={() => setShowNextStep(true)}>
                      الاشتراك في إحدى العضويات
                      <b> ←</b>
                    </a>
                  </h3>
                ) : (
                  <AuthGate>
                    <MembershipForm />
                  </AuthGate>
                )}
              </section>
            </NhostUrqlProvider>
          </NhostAuthProvider>
        </div>
      </Container>
    </LayoutContainer>
  )
}

export default Membership
