import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

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

export const CloseBtn = styled.svg`
  height: 20px;
  cursor: pointer;
`;

export const TweetControlBtn = styled.svg`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const DialogOverloay = styled(Dialog.Overlay)`
  background-color: rgba(227, 243, 172, 0.9);
  position: fixed;
  inset: 0;
`;

export const DialogContent = styled(Dialog.Content)`
  background-color: #44c662;
  border-radius: 0.5rem;
  position: fixed;
  top: 35%;
  left: 40%;
  width: 90vw;
  max-width: 360px;
  max-height: 85vh;
`;

export const DialogCloseBtn = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 7px;
  right: 7px;
  cursor: pointer;
`;
