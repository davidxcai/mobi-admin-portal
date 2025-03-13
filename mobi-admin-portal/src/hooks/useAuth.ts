import { useDispatch, useSelector } from "react-redux"; // let's me retrieve data from the redux store
import { RootState } from "../redux/store"; // a TypeScript type that helps ensure we're selecting the correct part of the state
// RootState is imported because it tells what the structure of the Redux store looks like
import { login, logout } from "../redux/slices/authSlice";
import { useCallback, useMemo } from "react";

type User = {
  username: string;
  student_id: string;
  name: {
    first: string;
    last: string;
  };
  role: string;
};

const DUMMY_USER: User = {
  username: "dxc0148",
  student_id: "1002230148",
  name: {
    first: "David",
    last: "Cai",
  },
  role: "admin",
};

const useAuth = () => {
  const dispatch = useDispatch(); // flip to table of contents
  // useSelector reads the current state fromthe Redux store
  const user = useSelector((state: RootState) => state.auth.user);
  //   Basically, go to the redux store, find state.auth.user, and return its value
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogin = useCallback(() => {
    dispatch(login(DUMMY_USER)); // Uses global DUMMY_USER instead of expecting an argument
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return useMemo(
    () => ({
      user,
      isAuthenticated,
      handleLogin,
      handleLogout,
    }),
    [user, isAuthenticated, handleLogin, handleLogout]
  );
};

export default useAuth;
