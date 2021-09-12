import { Link } from 'gatsby'
import { auth } from '../lib/nhost'
import { Router } from '@reach/router'
import React, { useState } from 'react'
import LayoutContainer from '../containers/layout'
import Container from './container'
import * as styles from './membership.module.css'
import AuthGate from './privateRoutes/auth-gate'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { NhostUrqlProvider } from '../lib/NhostUrqlProvider'
import { NhostAuthProvider } from '@nhost/react-auth'
import Login from './login'
import UserProfile from './privateRoutes/UserProfile'

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
              {showNextStep === false ? (
                <h2 className={styles.cta}>
                  <a onClick={() => setShowNextStep(true)}> الاشتراك في إحدى العضويات</a>
                </h2>
              ) : (
                <AuthGate>
                  <UserProfile path="/" />
                </AuthGate>
              )}
            </NhostUrqlProvider>
          </NhostAuthProvider>
        </div>
      </Container>
    </LayoutContainer>
  )
}

export default Membership
