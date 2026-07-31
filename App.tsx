import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react'; 

import AppBar from './src/components/AppBar';
import RepositoryList from './src/components/RepositoryList';
import SignIn from './src/components/SignIn';
import createApolloClient from './src/utils/apolloClient'; // Импортируем наш клиент

// Инициализируем настроенный экземпляр Apollo Client
const apolloClient = createApolloClient();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NativeRouter>
        <View style={styles.container}>
          <AppBar />
          
          <View style={styles.mainContent}>
            <Routes>
              <Route path="/" element={<RepositoryList />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </View>
        </View>
      </NativeRouter>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e5e8',
  },
  mainContent: {
    flex: 1,
  },
});
