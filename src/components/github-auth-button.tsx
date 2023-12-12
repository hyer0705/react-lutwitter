import { GithubAuthProvider, signInWithPopup } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Button, Logo } from "./auth-components";

export default function GithubAuthButton() {
  const navigate = useNavigate();

  const onGithubClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={onGithubClick}>
      <Logo src="/github-logo.svg" />
      Sign in with Github
    </Button>
  );
}
