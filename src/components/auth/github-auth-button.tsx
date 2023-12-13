import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { GithubAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "../../firebase";
import { Button, Logo } from "./auth-components";
import { isAuthEditState } from "../../atom/authAtom";

export default function GithubAuthButton() {
  const navigate = useNavigate();

  const setIsAuthEdit = useSetRecoilState(isAuthEditState);

  const onGithubClick = async () => {
    try {
      setIsAuthEdit(true);

      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthEdit(false);
    }
  };

  return (
    <Button onClick={onGithubClick}>
      <Logo src="/github-logo.svg" />
      Sign in with Github
    </Button>
  );
}
