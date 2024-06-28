import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth, setToken } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { log } from "console";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [login, setLogin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const response = await axios.get("/api/user", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          dispatch(setUser(response.data.user));
          dispatch(setToken(storedToken));
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        dispatch(clearAuth());
      }
    };

    fetchUser();
  }, [login]);

  return { user, setLogin };
};

export default useAuthSession;
