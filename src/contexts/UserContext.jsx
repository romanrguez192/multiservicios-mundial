import React, { useContext, useState, useEffect } from "react";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const A = new Promise((resolve, reject) =>
      setTimeout(() => {
        const usuario = {
          nombre: "pepitoxd",
          apellido: "nosheee",
        };

        resolve(usuario);
      }, 1000)
    );

    const user = await A;

    setUser(user);
    setLoading(false);
  };

  return (
    <UserContext.Provider value={user}>
      {!loading && children}
    </UserContext.Provider>
  );
};
