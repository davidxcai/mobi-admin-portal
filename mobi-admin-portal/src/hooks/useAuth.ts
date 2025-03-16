import { useDispatch, useSelector } from "react-redux"; // let's me retrieve data from the redux store
import { useCallback, useMemo, useEffect } from "react"; // lets me memoize functions
import { RootState } from "../redux/store"; // a TypeScript type that helps ensure we're selecting the correct part of the state
// RootState is imported because it tells what the structure of the Redux store looks like
import { login, logout } from "../redux/slices/authSlice";
import { User } from "../redux/types";
import { clearEvents, clearCurrentEvent } from "../redux/slices/eventsSlice";
import { clearCheckIns } from "../redux/slices/checkinSlice";
import useApi from "./useApi";

// useCallback and useMemo memorizes the function so that it doesn't have to be redefined every time the component re-renders

// import { userData } from "../development/data"; // development data

import { setCurrentPage } from "../redux/slices/uiSlice";

const useAuth = () => {
  const dispatch = useDispatch(); // flip to table of contents
  // useSelector reads the current state fromthe Redux store
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  //   Basically, go to the redux store, find state.auth.user, and return its value

  const handleLogin = useCallback(
    (userData: User) => {
      // api call here
      dispatch(login(userData)); // Uses development data instead of expecting an argument
    },
    [dispatch]
  );

  const { sendRequest: logoutApi, loading } = useApi(
    "logout",
    "http://localhost:3000/api/auth/logout",
    "POST"
  );

  const handleLogout = useCallback(async () => {
    const response = await logoutApi();
    console.log(response);
    if (response) {
      dispatch(clearCheckIns());
      dispatch(clearCurrentEvent());
      dispatch(clearEvents());
      dispatch(logout());
    }
  }, [dispatch]);

  // Redirect user if logged in or out
  useEffect(() => {
    if (user && isAuthenticated) {
      dispatch(setCurrentPage("dashboard"));
    } else if (!isAuthenticated || !user) {
      dispatch(setCurrentPage("login"));
    }
  }, [user, isAuthenticated, dispatch]);

  return useMemo(
    () => ({
      user,
      isAuthenticated,
      handleLogin,
      handleLogout,
    }),
    [user, isAuthenticated, handleLogin, handleLogout, loading]
  );
};

export default useAuth;
