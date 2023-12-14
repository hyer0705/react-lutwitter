import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { Button, Logo } from "./auth-components";
import { auth } from "../../firebase";
import { isAuthEditState } from "../../recoil/authAtom";

export default function GoogleAuthButton() {
  const navigate = useNavigate();

  const setIsAuthEdit = useSetRecoilState(isAuthEditState);

  const onGoogleClick = async () => {
    try {
      setIsAuthEdit(true);

      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsAuthEdit(false);
    }
  };

  return (
    <Button onClick={onGoogleClick}>
      <Logo src="/google-logo.svg" />
      Sign in with Google
    </Button>
  );
}
