import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW_MUTATION } from '../graphql/mutations';

interface ReviewVariables {
  ownerName: string;
  repositoryName: string;
  rating: number;
  text?: string;
}

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW_MUTATION);

  const createReview = async ({ ownerName, repositoryName, rating, text }: ReviewVariables) => {
    const { data } = await mutate({
      variables: {
        review: { ownerName, repositoryName, rating, text },
      },
    });
    return data;
  };

  return [createReview, result] as const;
};

export default useCreateReview;
