import styled from "styled-components";
import PostTweetForm from "../components/tweets/post-tweet-form";
import Timeline from "../components/tweets/timeline";

const Wrapper = styled.div`
  height: 100%;
  padding-right: 1rem;
`;

export default function Home() {
  return (
    <Wrapper>
      <PostTweetForm labelId="tweet-img" />
      <Timeline />
    </Wrapper>
  );
}
