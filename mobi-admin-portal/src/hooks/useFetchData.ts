import { useSelector } from "react-redux";
import { useMemo, useEffect } from "react";
import { RootState, useAppDispatch } from "../redux/store";
import useAuth from "./useAuth";

import { fetchEvents } from "../redux/slices/eventsSlice";

const useFetchData = () => {
  const dispatch = useAppDispatch();

  // const { loading, success, error, type } = useSelector(
  //   (state: RootState) => state.apiStatus
  // );

  // User authentication state
  const { user, isAuthenticated } = useAuth();

  // Data
  const events = useSelector((state: RootState) => state.events.data);

  // Auto fetch data when user is authenticated (on login)
  useEffect(() => {
    if (user && isAuthenticated) {
      // fetch data from the server
      dispatch(fetchEvents());
      console.log("Data fetched");
    }
  }, [dispatch, user, isAuthenticated]);

  return useMemo(() => ({ events }), [events]);
};

export default useFetchData;
