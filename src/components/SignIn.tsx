import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native'; // Импортируем хук перенаправления страниц
import useSignIn from '../hooks/useSignIn'; // Импортируем наш хук авторизации

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn(); // Инициализируем хук мутации
  const navigate = useNavigate(); // Инициализируем менеджер путей

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = async (values: typeof initialValues) => {
    const { username, password } = values;

    try {
      // Вызываем асинхронную функцию входа
      await signIn({ username, password });
      
      // Если ошибок нет — выводим нативное уведомление об успехе
      Alert.alert('Успех!', 'Вы успешно вошли в систему!');
      
      // Автоматически перенаправляем пользователя на главную страницу к списку репозиториев
      navigate('/');
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Unknown authorization error';
      console.error('SIGN IN FAILED:', errorMsg);
      Alert.alert('Ошибка авторизации', 'Неверное имя пользователя или пароль');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                touched.username && errors.username ? styles.inputError : null
              ]}
              placeholder="Username"
              placeholderTextColor="#999"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              autoCapitalize="none"
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                touched.password && errors.password ? styles.inputError : null
              ]}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              autoCapitalize="none"
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handleSubmit()}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#24292e',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e1e5e8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#24292e',
    backgroundColor: '#f8f9fa',
  },
  inputError: {
    borderColor: '#d73a49',
  },
  errorText: {
    color: '#d73a49',
    fontSize: 14,
    marginTop: 5,
    paddingLeft: 4,
  },
  button: {
    backgroundColor: '#0366d6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#0366d6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignIn;
