import React, { useState } from 'react';
import { 
  FlatList, 
  StyleSheet, 
  View, 
  ActivityIndicator, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Modal 
} from 'react-native';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  // Стейты сортировки
  const [orderBy, setOrderBy] = useState<'CREATED_AT' | 'RATING_AVERAGE'>('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [sortLabel, setSortLabel] = useState('Latest repositories');

  // Стейт видимости кастомного модального окна
  const [modalVisible, setModalVisible] = useState(false);

  // Стейты поиска
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, loading, error } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  // Функция централизованного выбора критерия сортировки
  const selectSorting = (order: 'CREATED_AT' | 'RATING_AVERAGE', direction: 'ASC' | 'DESC', label: string) => {
    setOrderBy(order);
    setOrderDirection(direction);
    setSortLabel(label);
    setModalVisible(false); // Закрываем меню после выбора
  };

  if (loading && repositories.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Error fetching data: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={(item) => item.id}
        
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {/* 1. Поле текстового поиска */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search repositories..."
              placeholderTextColor="#999"
              value={searchKeyword}
              onChangeText={(text) => setSearchKeyword(text)}
              autoCapitalize="none"
            />

            {/* 2. Кроссплатформенная кнопка вызова меню */}
            <TouchableOpacity 
              style={styles.sortButton} 
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.sortButtonTitle}>Sort by:</Text>
              <Text style={styles.sortButtonValue}>{sortLabel} ▾</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* 3. КРОССПЛАТФОРМЕННОЕ МОДАЛЬНОЕ МЕНЮ (Одинаковое для iOS и Android!) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Затемненный фон вокруг меню */}
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          {/* Белое всплывающее окошко по центру */}
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select sorting criteria</Text>

            <TouchableOpacity 
              style={styles.modalOption} 
              onPress={() => selectSorting('CREATED_AT', 'DESC', 'Latest repositories')}
            >
              <Text style={[styles.modalOptionText, sortLabel === 'Latest repositories' && styles.activeOptionText]}>
                Latest repositories
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalOption} 
              onPress={() => selectSorting('RATING_AVERAGE', 'DESC', 'Highest rated')}
            >
              <Text style={[styles.modalOptionText, sortLabel === 'Highest rated' && styles.activeOptionText]}>
                Highest rated repositories
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalOption} 
              onPress={() => selectSorting('RATING_AVERAGE', 'ASC', 'Lowest rated')}
            >
              <Text style={[styles.modalOptionText, sortLabel === 'Lowest rated' && styles.activeOptionText]}>
                Lowest rated repositories
              </Text>
            </TouchableOpacity>

            {/* Кнопка закрытия */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 8,
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
  headerContainer: {
    padding: 16,
    backgroundColor: '#e1e5e8',
  },
  searchInput: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: '#24292e',
    marginBottom: 12,
  },
  sortButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
  },
  sortButtonTitle: {
    fontSize: 15,
    color: '#586069',
    fontWeight: '500',
  },
  sortButtonValue: {
    fontSize: 15,
    color: '#0366d6',
    fontWeight: '600',
  },
  // СТИЛИ ДЛЯ КРОССПЛАТФОРМЕННОГО МОДАЛЬНОГО ОКНА
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Эффект красивого размытия/затемнения заднего фона
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#24292e',
    marginBottom: 20,
  },
  modalOption: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f2',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#24292e',
  },
  activeOptionText: {
    color: '#0366d6', // Подсвечиваем активный выбор синим цветом
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#ff3b30', // Красный цвет отмены
    fontWeight: '600',
  },
});

export default RepositoryList;
