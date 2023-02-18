import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

// eslint-disable-next-line react/prop-types
export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const tokenRedeemError = data?.redeemUserPassordResetToken?.code
    ? data?.redeemUserPassordResetToken
    : undefined;

  return (
    <Form
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault();
        await reset().catch(console.error);
        resetForm();
      }}
    >
      <h2>Reset Your Password</h2>
      <Error error={error || tokenRedeemError} />
      <fieldset disabled={loading} aria-busy={loading}>
        {data?.redeemUserPassordResetToken === null && (
          <p>Success! You can now sign in.</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}
