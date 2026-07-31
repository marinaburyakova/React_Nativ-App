import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  private namespace: string;

  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  // Получение токена из памяти телефона
  async getAccessToken(): Promise<string | null> {
    const token = await AsyncStorage.getItem(`${this.namespace}:token`);
    return token ? JSON.parse(token) : null;
  }

  // Сохранение токена в память телефона
  async setAccessToken(accessToken: string): Promise<void> {
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      JSON.stringify(accessToken)
    );
  }

  // Удаление токена (Выход из системы)
  async removeAccessToken(): Promise<void> {
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;
