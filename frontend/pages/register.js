import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { gql, useMutation } from "@apollo/client";
import Cookie from "js-cookie";

import Loader from "@/components/Loader";
import FormRegister from "@/components/FormRegister";

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export default function RegisterRoute() {
  const { setUser } = useAppContext();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    const { email, password } = formData;
    const { data } = await registerMutation({
      variables: { username: email, email: email, password },
    });
    if (data?.register.user) {
      alert("SUCCESS: Your account is ready. Happy shopping!");
      setUser(data.register.user);
      router.push("/");
      Cookie.set("token", data.register.jwt);
    }
  };

  if (loading) return <Loader />;

  return (
    <FormRegister
      title="Sign Up"
      buttonText="Sign Up"
      formData={formData}
      setFormData={setFormData}
      callback={handleRegister}
      error={error}
    />
  );
}