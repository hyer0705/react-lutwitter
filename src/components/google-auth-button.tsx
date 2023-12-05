import { useNavigate } from "react-router-dom";
import { Button, Logo } from "./auth-components";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "../firebase";

export default function GoogleAuthButton() {
  const navigate = useNavigate();
  const onGoogleClick = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={onGoogleClick}>
      <Logo src="/google-logo.svg" />
      Sign in with Google
    </Button>
  );
}
