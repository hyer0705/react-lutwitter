import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { router } from "./router";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;

  }
  body {
    background-color: #44C662;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 720px;
  padding: 5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyle />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
