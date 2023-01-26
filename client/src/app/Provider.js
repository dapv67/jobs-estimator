import React, { createContext, useState } from "react";

const Provider = ({ children }) => {
  const [token, setToken] = useState({});

  return (
    <AppContext.Provider value={[token, setToken]}>
      {children}
    </AppContext.Provider>
  );
};

export default Provider;
export const AppContext = createContext();
