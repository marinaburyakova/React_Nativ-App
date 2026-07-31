import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native'; // Импортируем нативный Link

interface AppBarTabProps {
  title: string;
  to: string; // Путь, куда ведет вкладка (например, '/' или '/signin')
}

const AppBarTab = ({ title, to }: AppBarTabProps) => {
  return (
    // underlayColor задает цвет подсветки вкладки в момент самого прикосновения пальца
    <Link to={to} underlayColor="#343a40" style={styles.tab}>
      <Text style={styles.text}>{title}</Text>
    </Link>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppBarTab;
