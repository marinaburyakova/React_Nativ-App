import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

// Схема валидации данных через Yup по спецификации курса
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
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values: typeof initialValues) => {
    console.log('Submitted values:', values);
    // В следующих упражнениях здесь будет вызов GraphQL мутации авторизации
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

          {/* Поле ввода Username */}
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

          {/* Поле ввода Password */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                touched.password && errors.password ? styles.inputError : null
              ]}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={true} // Скрывает вводимые символы (пароль)
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              autoCapitalize="none"
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Кастомная кнопка отправки формы */}
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
    borderColor: '#d73a49', // Красная граница при ошибке валидации
  },
  errorText: {
    color: '#d73a49',
    fontSize: 14,
    marginTop: 5,
    paddingLeft: 4,
  },
  button: {
    backgroundColor: '#0366d6', // Синий фирменный цвет кнопок GitHub
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
