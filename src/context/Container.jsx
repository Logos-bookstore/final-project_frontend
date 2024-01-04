import { useEffect, useState } from "react";
import { Context } from "./Context";

export default function Container({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      async function verify() {
        try {
          const response = await fetch(`${import.meta.env.VITE_VERIFY_TOKEN}`, {
            method: "GET",
            headers: { token: token },
          });
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setUser(data.data);
            }
          }
        } catch (error) {
          //
        }
      }

      verify();
    }
  }, []);
  return (
    <>
      <Context.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}
