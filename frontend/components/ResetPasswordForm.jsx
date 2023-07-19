import { useState } from "react";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";

const RESET_PASSWORD_MUTATION = gql`
mutation ResetPassword(
  $password: String!
  $passwordConfirmation: String!
  $code: String!
) {
  resetPassword(
    password: $password
    passwordConfirmation: $passwordConfirmation
    code: $code
  ) {
    jwt
    user {
      id
      username
      email
      confirmed
      blocked
      role {
        name
      }
    }
  }
}
`;



export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD_MUTATION);
  const router = useRouter();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await resetPassword({ variables: { email } });
      router.push("/reset-password-success");
    } catch (error) {
      console.log("Error occurred while resetting password:", error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={handleResetPassword}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Reset Password
        </button>
      </form>
    </div>
  );
}
