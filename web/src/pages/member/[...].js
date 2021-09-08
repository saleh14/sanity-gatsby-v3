import React, { useContext, useEffect } from 'react'
import { Router } from '@reach/router'
import { NhostAuthProvider } from '@nhost/react-auth'
import { auth } from '../../lib/nhost'
import Login from '../../components/login'
import Container from '../../components/container'
import GraphQLErrorList from '../../components/graphql-error-list'
import Seo from '../../components/seo'
import Layout from '../../containers/layout'
import { MemberContext } from '../../lib/MemberContext'
import { NhostUrqlProvider } from '../../lib/NhostUrqlProvider'
import AuthGate from '../../components/auth-gate'
import UserProfile from '../../components/UserProfile'

const App = () => {
  return (
    <Layout>
      <Container>
        <NhostAuthProvider auth={auth}>
          <NhostUrqlProvider
            auth={auth}
            gqlEndpoint="https://hasura-86297f6e.nhost.app/v1/graphql"
          >
            <AuthGate>
              <Router basepath="/member">
                <Login path="/login" />
                <UserProfile path="/" />
              </Router>
            </AuthGate>
          </NhostUrqlProvider>
        </NhostAuthProvider>
      </Container>
    </Layout>
  )
}

export default App
