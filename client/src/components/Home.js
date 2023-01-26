import { useAuth0 } from "@auth0/auth0-react";

import { LoginButton } from "./utilities/Login";
import { LogoutButton } from "./utilities/Logout";
// import { Profile } from "./Profile";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ? (
          <>
            {/* <Profile /> */}
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </header>
    </div>
  );
}

export default App;
