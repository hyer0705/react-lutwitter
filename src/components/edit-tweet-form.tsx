import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  Form,
  ImgFileInput,
  ImgFileLabel,
  TweetInputWrapper,
  TweetPostBtn,
  TweetTextArea,
} from "./tweet-components";
import { ITweetForm } from "./post-tweet-form";
import { ITweet } from "./timeline";
import { auth, db } from "../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

const Wrapper = styled.div`
  background-color: #44c662;
  border-radius: 0.5rem;
  width: 360px;
`;

const CloseBtnWrapper = styled.div`
  padding: 0.5rem 1rem;
  border-top-left-radius: 0.5rem;
  background-color: #000;
  border-top-right-radius: 0.5rem;
  display: flex;
  justify-content: end;
  align-items: center;
`;
const CloseBtn = styled.svg`
  height: 20px;
  cursor: pointer;
`;

export default function EditTweetForm({
  tweet,
  userId,
  id,
}: {
  tweet: ITweet["tweet"];
  userId: ITweet["userId"];
  id: ITweet["id"];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm<ITweetForm>({
    defaultValues: {
      tweet,
    },
  });

  const onValid = async (validData: ITweetForm) => {
    const { tweet, img } = validData;
    const user = auth.currentUser;

    if (user?.uid !== userId) return;

    try {
      setIsLoading(true);
      await updateDoc(doc(db, "tweets", id), {
        tweet,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    console.log(tweet);
  };

  return (
    <Wrapper>
      <CloseBtnWrapper>
        <CloseBtn
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </CloseBtn>
      </CloseBtnWrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <TweetTextArea
          rows={5}
          placeholder="What's happening?"
          maxLength={200}
          {...register("tweet", {
            required: {
              value: true,
              message: "무슨 일이 있었는지 입력해주세요.",
            },
            maxLength: {
              value: 200,
              message: "tweet은 200글자까지 입력 가능합니다.",
            },
          })}
        />
        <TweetInputWrapper>
          <ImgFileLabel htmlFor="tweet-img">
            {watch("img")?.length === 1 ? (
              "Photo added ✅"
            ) : (
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            )}
          </ImgFileLabel>
          <ImgFileInput
            id="tweet-img"
            type="file"
            accept="image/*"
            {...register("img", {
              validate: {
                maxFileSize: (v) => {
                  if (v && v.length > 0) {
                    return (
                      v[0].size < 1 * 1024 * 1024 ||
                      "1MB 이하의 이미지 파일만 가능합니다."
                    );
                  }
                },
              },
            })}
          />
          <TweetPostBtn
            type="submit"
            value={isLoading ? "Posting..." : "POST"}
          />
        </TweetInputWrapper>
      </Form>
    </Wrapper>
  );
}
