import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeRouter, Route, Routes } from 'react-router-native'
import { ApolloProvider } from '@apollo/client/react'
import { StatusBar } from 'expo-status-bar'
import AppBar from './src/components/AppBar'
import RepositoryList from './src/components/RepositoryList'
import SignIn from './src/components/SignIn'
import createApolloClient from './src/utils/apolloClient' // Импортируем наш клиент
import CreateReview from './src/components/CreateReview' // Импортируем нашу форму отзывов

// Инициализируем настроенный экземпляр Apollo Client
const apolloClient = createApolloClient()

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <StatusBar style="light" />
      <NativeRouter>
        <View style={styles.container}>
          <AppBar />

          <View style={styles.mainContent}>
            <Routes>
              <Route
                path="/"
                element={<RepositoryList />}
              />
              <Route
                path="/signin"
                element={<SignIn />}
              />
              <Route
                path="/create-review"
                element={<CreateReview />}
              />
            </Routes>
          </View>
        </View>
      </NativeRouter>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e5e8',
  },
  mainContent: {
    flex: 1,
  },
})
