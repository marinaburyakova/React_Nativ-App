import { gql } from '@apollo/client'

// Запрос на получение списка репозиториев по спецификации GraphQL-сервера курса
export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
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
`
