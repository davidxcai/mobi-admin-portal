import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import { RootState } from "../redux/store";
import useAuth from "./useAuth";
import { AppDispatch } from "../redux/store";

import { apiRequest } from "../redux/slices/apiSlice";

// Handles all API requests
const useApi = (
  key: string,
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
) => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  // Redux selectors
  const data = useSelector((state: RootState) => state.api.data[key]);
  const loading = useSelector((state: RootState) => state.api.loading[key]);
  const error = useSelector((state: RootState) => state.api.error[key]);

  // Send API request
  const sendRequest = useCallback(
    (body?: any) => {
      dispatch(apiRequest({ key, url, method, body }));
    },
    [dispatch, key, url, method]
  );

  // Auto-fetch when authenticated
  // Do not modify this useEffect, make custom requests in the component
  useEffect(() => {
    if (user && isAuthenticated && method === "GET") {
      sendRequest();
    }
  }, [user, isAuthenticated, sendRequest, method]);

  return { data, loading, error, sendRequest };
};

export default useApi;
