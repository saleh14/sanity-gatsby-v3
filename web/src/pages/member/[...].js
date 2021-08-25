import React, { useContext, useEffect } from 'react'
import { Router } from '@reach/router'
import { NhostAuthProvider } from '@nhost/react-auth'
// import { auth } from '../../lib/nhost'
// import Login from '../../components/Login'
// import Container from '../../components/container'
// import GraphQLErrorList from '../../components/graphql-error-list'
// import Seo from '../../components/seo'
// import Layout from '../../containers/layout'
// import MemberDefault from '../../components/memberDefault'
// import { MemberContext } from '../../lib/MemberContext'
// import { NhostUrqlProvider } from '../../lib/NhostUrqlProvider'

const App = () => {
  return (
    <div>hello</div>

    // <Layout>
    //   <Container>
    //     <NhostAuthProvider auth={auth}>
    //       <NhostUrqlProvider
    //         auth={auth}
    //         gqlEndpoint="https://hasura-e7c479eb.nhost.app/v1/graphql"
    //       >
    //         <Router basepath="/member">
    //           <Login path="/login" />
    //           <MemberDefault path="/" />
    //         </Router>
    //       </NhostUrqlProvider>
    //     </NhostAuthProvider>
    //   </Container>
    // </Layout>
  )
}

export default App
