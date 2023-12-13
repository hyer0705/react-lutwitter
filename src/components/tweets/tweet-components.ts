import styled from "styled-components";

export const Form = styled.form`
  padding: 2rem 1rem;
`;
export const TweetTextArea = styled.textarea`
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  resize: vertical;
  background-color: inherit;
  border: 1px solid #e3f3ac;
  font-weight: 600;
  &:focus {
    outline: 1px solid #c9182b;
    border-color: #c9182b;
  }
`;

export const TweetInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
  align-items: center;
`;
export const ImgFileLabel = styled.label`
  cursor: pointer;
  svg {
    height: 30px;
  }
`;
export const ImgFileInput = styled.input`
  display: none;
`;
export const TweetPostBtn = styled.input`
  color: #fff;
  background-color: #000;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 2rem;
  height: 30px;
  cursor: pointer;
  &:hover {
    background-color: #222;
  }
`;
