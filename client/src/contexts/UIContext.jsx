import { useEffect, useState, createContext } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [hideNav, setHideNav] = useState(true);

  useEffect(() => {
    const storedNav = localStorage.getItem("hideNav");
    setHideNav(storedNav !== "false");
  }, []);

  useEffect(() => {
    localStorage.setItem("hideNav", hideNav.toString());
  }, [hideNav]);

  return (
    <UIContext.Provider value={{ hideNav, setHideNav }}>
      {children}
    </UIContext.Provider>
  );
};
