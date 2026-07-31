import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

interface RepositoryNode {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

interface GetRepositoriesData {
  repositories: {
    edges: Array<{
      node: RepositoryNode;
    }>;
  };
}

// Перечисляем аргументы, которые принимает хук
interface UseRepositoriesVariables {
  orderBy?: 'CREATED_AT' | 'RATING_AVERAGE';
  orderDirection?: 'ASC' | 'DESC';
  searchKeyword?: string;
}

const useRepositories = (variables: UseRepositoriesVariables) => {
  // Передаем переменные фильтрации и сортировки напрямую в useQuery!
  const { data, error, loading, refetch } = useQuery<GetRepositoriesData>(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables, // Хук автоматически перезапустит запрос при изменении этих параметров!
  });

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return { repositories: repositoryNodes, loading, error, refetch };
};

export default useRepositories;
