import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  padding: 5rem 0;
`;

export const Form = styled.form`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    margin-bottom: 1rem;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 2rem;
`;

export const Error = styled.span`
  font-weight: 600;
  color: #c9182b;
`;

export const Switcher = styled.span`
  margin-top: 1rem;
  a {
    font-weight: 700;
    color: #c9182b;
    text-decoration: none;
    margin-left: 0.5rem;
  }
`;
