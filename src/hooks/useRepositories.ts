import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

// Описываем структуру ответа от GraphQL сервера
interface RepositoryNode {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
}

interface GetRepositoriesData {
  repositories: {
    edges: Array<{
      node: RepositoryNode;
    }>;
  };
}

const useRepositories = () => {
  // Вызываем нативный хук useQuery от Apollo Client
  const { data, error, loading, refetch } = useQuery<GetRepositoriesData>(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network', // Сначала берем из кэша, но параллельно обновляем из сети
  });

  // Преобразуем сложную GraphQL-структуру edges/node в плоский массив для FlatList
  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return { repositories: repositoryNodes, loading, error, refetch };
};

export default useRepositories;
