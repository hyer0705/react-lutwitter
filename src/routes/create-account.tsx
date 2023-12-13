import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth } from "../firebase";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth/auth-components";
import { FirebaseError } from "@firebase/app";
import GithubAuthButton from "../components/auth/github-auth-button";
import GoogleAuthButton from "../components/auth/google-auth-button";

interface ICreateAccountForm {
  name: string;
  email: string;
  password: string;
  error?: string;
}

export default function CreateAccount() {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAccountForm>();

  const onValid: SubmitHandler<ICreateAccountForm> = async (validData) => {
    const { email, name, password } = validData;
    setErrorMsg("");

    try {
      // create an account
      // set the name of the user
      // redirect to the home page

      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credentials.user, {
        displayName: name,
      });

      navigate("/");
    } catch (error) {
      // setError
      if (error instanceof FirebaseError) {
        setErrorMsg(error.message);
        // setError("error", {
        //   type: error.code,
        //   message: error.message,
        // }); 추후에 더 알아보기!
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join Lutwitter</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          placeholder="Name"
          {...register("name", { required: "Name is required..." })}
        />
        <Error>{errors.name?.message}</Error>
        <Input
          placeholder="Email"
          {...register("email", { required: "Email is required..." })}
        />
        <Error>{errors.email?.message}</Error>
        <Input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register("password", { required: "Password is required..." })}
        />
        <Error>{errors.password?.message}</Error>
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      <Error>{errorMsg ? errorMsg : ""}</Error>
      <Switcher>
        이미 계정이 있으신가요??
        <Link to="/login">Login &rarr;</Link>
      </Switcher>
      <GoogleAuthButton />
      <GithubAuthButton />
    </Wrapper>
  );
}
