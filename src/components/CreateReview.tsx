import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';

// Схема жесткой валидации Yup по спецификации университета
const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string().optional(),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: '',
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      // Превращаем строковое значение инпута оценки в число перед отправкой в GraphQL
      await createReview({
        ownerName: values.ownerName,
        repositoryName: values.repositoryName,
        rating: Number(values.rating),
        text: values.text,
      });

      Alert.alert('Успех!', 'Отзыв успешно добавлен!');
      navigate('/'); // Перенаправляем пользователя на главную страницу к списку
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : 'Error creating review';
      Alert.alert('Ошибка', errorMsg);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a review</Text>

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            
            {/* Владелец репозитория */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, touched.ownerName && errors.ownerName && styles.inputError]}
                placeholder="Repository owner name"
                placeholderTextColor="#999"
                onChangeText={handleChange('ownerName')}
                onBlur={handleBlur('ownerName')}
                value={values.ownerName}
                autoCapitalize="none"
              />
              {touched.ownerName && errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}
            </View>

            {/* Название репозитория */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, touched.repositoryName && errors.repositoryName && styles.inputError]}
                placeholder="Repository name"
                placeholderTextColor="#999"
                onChangeText={handleChange('repositoryName')}
                onBlur={handleBlur('repositoryName')}
                value={values.repositoryName}
                autoCapitalize="none"
              />
              {touched.repositoryName && errors.repositoryName && <Text style={styles.errorText}>{errors.repositoryName}</Text>}
            </View>

            {/* Оценка от 0 до 100 */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, touched.rating && errors.rating && styles.inputError]}
                placeholder="Rating between 0 and 100"
                placeholderTextColor="#999"
                keyboardType="numeric" // Открывает числовую клавиатуру на телефоне
                onChangeText={handleChange('rating')}
                onBlur={handleBlur('rating')}
                value={values.rating}
              />
              {touched.rating && errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}
            </View>

            {/* Текст отзыва (Многострочное поле) */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="Review text (optional)"
                placeholderTextColor="#999"
                multiline={true} // Делает инпут многострочным текстовым блоком
                numberOfLines={4}
                onChangeText={handleChange('text')}
                onBlur={handleBlur('text')}
                value={values.text}
              />
            </View>

            {/* Кнопка отправки отзыва */}
            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Create a review</Text>
            </TouchableOpacity>

          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#24292e',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
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
  multilineInput: {
    height: 100,
    textAlignVertical: 'top', // Выравнивает плейсхолдер по верхнему краю на Android
  },
  inputError: {
    borderColor: '#d73a49',
  },
  errorText: {
    color: '#d73a49',
    fontSize: 14,
    marginTop: 4,
    paddingLeft: 4,
  },
  button: {
    backgroundColor: '#0366d6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateReview;
