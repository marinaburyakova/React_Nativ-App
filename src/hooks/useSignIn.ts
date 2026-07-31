import { useMutation } from '@apollo/client/react';
import { SIGN_IN_MUTATION } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';

// 1. Описываем интерфейс ответа от GraphQL-сервера при успешной авторизации
interface SignInResponseData {
  authenticate: {
    accessToken: string;
  };
}

// 2. Описываем структуру переменных, отправляемых на сервер
interface SignInVariables {
  credentials: {
    username: string;
    password: string;
  };
}

const authStorage = new AuthStorage();

const useSignIn = () => {
  //  Передаем интерфейсы в useMutation в качестве дженериков <Данные, Переменные>
  const [mutate, result] = useMutation<SignInResponseData, SignInVariables>(SIGN_IN_MUTATION);

  const signIn = async ({ username, password }: SignInVariables['credentials']) => {
    // Отправляем строго типизированные данные на сервер
    const { data } = await mutate({
      variables: {
        credentials: { username, password }
      }
    });

    // Теперь TypeScript четко знает, что поле authenticate существует!
    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
    }

    return data;
  };

  return [signIn, result] as const;
};

export default useSignIn;
