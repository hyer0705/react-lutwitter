import { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Wrapper = styled.div`
  width: 360px;
`;

const Form = styled.form`
  padding: 2rem 1rem;
`;
const TweetTextArea = styled.textarea`
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

const TweetInputWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
  align-items: center;
`;
const ImgFileLabel = styled.label`
  cursor: pointer;
  svg {
    height: 30px;
  }
`;
const ImgFileInput = styled.input`
  display: none;
`;
const TweetPostBtn = styled.input`
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

interface ITweetForm {
  tweet: string;
  img?: FileList;
}

export default function PostTweetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm<ITweetForm>();

  const onValid = async (validData: ITweetForm) => {
    const { tweet, img } = validData;
    const user = auth.currentUser;

    if (!user || isLoading || tweet === "" || tweet.length > 200) return;

    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "익명",
        userId: user.uid,
      });
      if (img) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, img[0]);
        const url = await getDownloadURL(result.ref);

        await updateDoc(doc, {
          photo: url,
        });
      }

      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
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
