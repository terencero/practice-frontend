import { gql, useMutation } from '@apollo/client';

export const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    endSession
  }
`;

export function SignOut() {
  const [signOut] = useMutation(SIGNOUT_MUTATION);
  return signOut;
}
