import React from "react"
import { Router } from "@reach/router"
import { NhostApolloProvider } from "@nhost/react-apollo";
import { NhostAuthProvider } from "@nhost/react-auth";
import { auth } from "../../lib/nhost";
import Login from "../../components/Login"
import Container from "../../components/container";
import GraphQLErrorList from "../../components/graphql-error-list";
import Seo from "../../components/seo";
import Layout from "../../containers/layout";
import MemberDefault from "../../components/memberDefault";

const App = () => {
  return (
    <Layout>
      <Container>
        <NhostAuthProvider auth={auth}>
          <NhostApolloProvider
            auth={auth}
            gqlEndpoint="https://hasura-ae96eb59.nhost.app/v1/graphql"
          >

            <Router basepath="/member">
              <Login path="/login" />
              <MemberDefault path="/" />
            </Router>
          </NhostApolloProvider>
        </NhostAuthProvider>
      </Container>
    </Layout>
  )
}

export default App