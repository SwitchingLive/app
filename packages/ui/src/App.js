import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider, Client, defaultExchanges, subscriptionExchange } from 'urql'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { BrowserRouter as Router } from 'react-router-dom'
import SwitchingLive from './View/Index.jsx'

const subscriptionClient = new SubscriptionClient(`${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.hostname}:${window.location.port}/graphql`, { reconnect: true })

const client = new Client({
  url: '/graphql',
  requestPolicy: 'network-only',
  maskTypename: true,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription (operation) {
        return subscriptionClient.request(operation)
      }
    })
  ]
})

const App = () => (
  <Provider value={client}>
    <Router>
      <SwitchingLive />
    </Router>
  </Provider>
)

export default hot(App)
