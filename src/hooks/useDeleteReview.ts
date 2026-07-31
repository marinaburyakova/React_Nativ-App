import { useMutation } from '@apollo/client/react';
import { DELETE_REVIEW_MUTATION } from '../graphql/mutations';
import { GET_CURRENT_USER } from '../graphql/queries';

const useDeleteReview = () => {
  const [mutate] = useMutation(DELETE_REVIEW_MUTATION, {
    // После удаления просим Apollo перечитать список "Моих отзывов", чтобы они исчезли с экрана
    refetchQueries: [{ query: GET_CURRENT_USER, variables: { includeReviews: true } }],
  });

  const deleteReview = async (id: string) => {
    await mutate({ variables: { id } });
  };

  return [deleteReview] as const;
};

export default useDeleteReview;
