import React from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories'; // Импортируем наш хук

const RepositoryList = () => {
  // Забираем динамические данные, статус загрузки и ошибки напрямую с GraphQL-сервера!
  const { repositories, loading, error } = useRepositories();

  // Если сервер еще отвечает, показываем нативный индикатор загрузки (спиннер)
  if (loading && repositories.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  // Обработка возможных сетевых ошибок или неверного IP
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error fetching data: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 8, // Немного увеличили расстояние между карточками для красоты
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e5e8',
  },
  errorText: {
    color: '#d73a49',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    padding: 20,
  },
});

export default RepositoryList;
