import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface RepositoryItemProps {
  item: {
    fullName: string;
    description: string;
    language: string;
    forksCount: number;
    stargazersCount: number;
    ratingAverage: number;
    reviewCount: number;
    ownerAvatarUrl: string; // Добавили поле аватара в типы
  };
}

// Функция форматирования чисел (например, 8439 -> 8.4k)
const formatCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryItem = ({ item }: RepositoryItemProps) => {
  return (
    <View style={styles.container}>
      
      {/* ВЕРХНИЙ БЛОК: Горизонтальная сетка (Аватар + Текстовая информация) */}
      <View style={styles.topSection}>
        {/* Аватар автора с закруглением */}
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        
        {/* Контейнер для текста, flexShrink предотвращает вылезание длинного текста за экран */}
        <View style={styles.infoContainer}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.languageContainer}>
            <Text style={styles.languageText}>{item.language}</Text>
          </View>
        </View>
      </View>

      {/* НИЖНИЙ БЛОК: Статистика */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatCount(item.stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatCount(item.forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatCount(item.reviewCount)}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  topSection: {
    flexDirection: 'row', // Выстраивает аватар и текст в одну строчку
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 6, // Мягкое скругление углов аватара по гайдлайнам GitHub
    marginRight: 16,
  },
  infoContainer: {
    flex: 1, // Заставляет блок текста занимать всю оставшуюся ширину карточки
    alignItems: 'flex-start',
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#24292e',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#586069',
    marginBottom: 8,
    lineHeight: 18,
  },
  languageContainer: {
    backgroundColor: '#0366d6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  languageText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f1f1f5',
    paddingTop: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#24292e',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#586069',
  },
});

export default RepositoryItem;
