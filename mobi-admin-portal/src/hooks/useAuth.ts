import { useDispatch, useSelector } from "react-redux"; // let's me retrieve data from the redux store
import { RootState } from "../redux/store"; // a TypeScript type that helps ensure we're selecting the correct part of the state
// RootState is imported because it tells what the structure of the Redux store looks like
import { login, logout } from "../redux/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch(); // flip to table of contents
  // useSelector reads the current state fromthe Redux store
  const user = useSelector((state: RootState) => state.auth.user);
  //   Basically, go to the redux store, find state.auth.user, and return its value

  const handleLogin = () => {
    dispatch(login("David"));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return { user, handleLogin, handleLogout };
};

export default useAuth;
