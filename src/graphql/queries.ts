import { gql } from '@apollo/client';

// ИСПРАВЛЕНО: Запрос теперь принимает динамические переменные для фильтрации и сортировки на сервере!
export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
