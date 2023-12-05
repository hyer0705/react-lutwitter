import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await auth.signOut();

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
}
