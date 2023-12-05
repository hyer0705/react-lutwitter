import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  padding: 5rem 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

interface ICreateAccountForm {
  name: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAccountForm>();

  const onValid = (validData: ICreateAccountForm) => {
    console.log(validData);
    try {
      // create an account
      // set the name of the user
      // redirect to the home page
    } catch (error) {
      // setError
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
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
          {...register("password", { required: "Password is required..." })}
        />
        <Error>{errors.password?.message}</Error>
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
    </Wrapper>
  );
}
