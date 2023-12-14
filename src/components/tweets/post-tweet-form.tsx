import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  Form,
  ImgFileInput,
  ImgFileLabel,
  TweetInputWrapper,
  TweetPostBtn,
  TweetTextArea,
} from "./tweet-components";
import { maxFileSize } from "../../libs/form-validate";
import { isOpenPostTweetDialog } from "../../atom/tweetAtom";

const Wrapper = styled.div`
  width: 360px;
`;

export interface ITweetForm {
  tweet: string;
  img?: FileList;
}

export default function PostTweetForm({ labelId }: { labelId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm<ITweetForm>();

  const setIsOpenDialog = useSetRecoilState(isOpenPostTweetDialog);

  const onValid = async (validData: ITweetForm) => {
    const { tweet, img } = validData;
    const user = auth.currentUser;

    if (!user || isLoading || tweet === "" || tweet.length > 200) return;

    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        creatorName: user.displayName || "익명",
        creatorId: user.uid,
        creatorAvatar: user.photoURL,
      });
      if (img && img?.length > 0) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, img[0]);
        const url = await getDownloadURL(result.ref);

        await updateDoc(doc, {
          photo: url,
        });
      }

      reset();
      setIsOpenDialog(false);
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
          <ImgFileLabel htmlFor={labelId}>
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
            id={labelId}
            type="file"
            accept="image/*"
            {...register("img", {
              validate: {
                maxFileSize,
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
