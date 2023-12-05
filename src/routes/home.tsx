import { auth } from "../firebase";

export default function Home() {
  const logout = () => {
    auth.signOut();
  };
  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
}
