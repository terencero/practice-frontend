import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

export const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    endSession
  }
`;

export function SignOut() {
  const [signOut] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return signOut;
}
