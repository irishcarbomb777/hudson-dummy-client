import React, {useState, useEffect} from "react"
import { AuthenticationContext } from "./hooks/contextHooks";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import Routes from "./Routes";

import styled from 'styled-components';

export const App = () => {
  const [loginAuthenticated, setLoginAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      await Auth.currentSession();
      setLoginAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }


  return (
    !isAuthenticating && (
      <>
        {!loginAuthenticated ?
          <div>
            <AuthenticationContext.Provider value={{loginAuthenticated, setLoginAuthenticated}}>
              <Routes />
            </AuthenticationContext.Provider>
          </div>
          :
            <MainContainer>
              <AuthenticationContext.Provider value={{loginAuthenticated, setLoginAuthenticated}}>
                <Routes />
              </AuthenticationContext.Provider>
            </MainContainer>
        }
      </>
    )
  );
}


const MainContainer = styled.div`
  padding: 100px 50px 50px 50px;
`

