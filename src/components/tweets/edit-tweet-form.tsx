import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
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
import { auth, db, storage } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { showEditFormState } from "../../atom/tweetAtom";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { maxFileSize } from "../../libs/form-validate";

export default function EditTweetForm({
  tweet,
  userId,
  id,
  photo,
}: {
  tweet: ITweet["tweet"];
  userId: ITweet["userId"];
  id: ITweet["id"];
  photo?: ITweet["photo"];
}) {
  const setShowEditForm = useSetRecoilState(showEditFormState);
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

      if (img && img.length > 0) {
        const imgRef = ref(storage, `tweets/${user.uid}/${id}`);

        // remove
        if (photo) {
          await deleteObject(imgRef);
        }
        // add
        const result = await uploadBytes(imgRef, img[0]);
        const url = await getDownloadURL(result.ref);

        await updateDoc(doc(db, "tweets", id), {
          photo: url,
        });
      }

      setShowEditForm({ tweetId: "", showEdit: false });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <ImgFileLabel htmlFor={`img-${id}`}>
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
          id={`img-${id}`}
          type="file"
          accept="image/*"
          {...register("img", {
            validate: {
              maxFileSize,
            },
          })}
        />
        <TweetPostBtn type="submit" value={isLoading ? "Posting..." : "POST"} />
      </TweetInputWrapper>
    </Form>
  );
}
