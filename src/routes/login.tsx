import { useNavigate, Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import { FirebaseError } from "@firebase/app";

interface ILoginForm {
  email: string;
  password: string;
  error?: string;
}

export default function Login() {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onValid: SubmitHandler<ILoginForm> = async (validData) => {
    const { email, password } = validData;
    setErrorMsg("");

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

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
      <Title>Login Lutwitter</Title>
      <Form onSubmit={handleSubmit(onValid)}>
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
        <Input type="submit" value={isLoading ? "Loading..." : "Login"} />
      </Form>
      <Error>{errorMsg ? errorMsg : ""}</Error>
      <Switcher>
        계정이 없으신가요?
        <Link to="/create-account">Sign up &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
