import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client/react';
import { GET_CURRENT_USER } from '../graphql/queries';
import AuthStorage from '../utils/authStorage';
import AppBarTab from './AppBarTab';

const authStorage = new AuthStorage();

// 1. Описываем интерфейс ответа от GraphQL-сервера для запроса Me
interface MeResponseData {
  me: {
    id: string;
    username: string;
  } | null;
}

const AppBar = () => {
  const apolloClient = useApolloClient();
  
  // ИСПРАВЛЕНО: Передаем интерфейс MeResponseData в useQuery в качестве дженерика <Данные>
  const { data } = useQuery<MeResponseData>(GET_CURRENT_USER);
  const authorizedUser = data ? data.me : null;

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        <AppBarTab title="Repositories" to="/" />
        
        {authorizedUser ? (
          <TouchableOpacity activeOpacity={0.7} onPress={handleSignOut} style={styles.tabButton}>
            <Text style={styles.tabText}>Sign out</Text>
          </TouchableOpacity>
        ) : (
          <AppBarTab title="Sign in" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 15,
    backgroundColor: '#24292e',
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppBar;
