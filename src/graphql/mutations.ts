import { gql } from '@apollo/client'

export const SIGN_IN_MUTATION = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`
// Мутация для создания отзыва по спецификации GraphQL-сервера курса
export const CREATE_REVIEW_MUTATION = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      repositoryId
      rating
      text
    }
  }
`
