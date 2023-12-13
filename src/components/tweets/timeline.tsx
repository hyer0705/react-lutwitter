import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  tweet: string;
  userId: string;
  username: string;
  photo?: string;
  createdAt: number;
}

const Wrapper = styled.div`
  padding-right: 1rem;
  height: 75%;
  display: grid;
  gap: 1rem;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, userId, username, photo, createdAt } = doc.data();
          return {
            tweet,
            userId,
            username,
            photo,
            createdAt,
            id: doc.id,
          };
        });

        setTweet(tweets);
      });
    };

    fetchTweets();

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
