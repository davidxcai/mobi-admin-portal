import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store";

import { apiRequest } from "../redux/slices/apiSlice";

// Handles all API requests
const useApi = <T = any>(
  key: string,
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  onSuccess?: (data: T) => void, // Ensure onSuccess uses generic type T
  existingData?: any
) => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux selectors
  const data = useSelector((state: RootState) => state.api.data[key]);
  const loading = useSelector((state: RootState) => state.api.loading[key]);
  const error = useSelector((state: RootState) => state.api.error[key]);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Ensure sendRequest has a typed return value
  const sendRequest = useCallback(
    async (body?: any): Promise<{ data: T } | null> => {
      const resultAction = await dispatch(
        apiRequest({ key, url, method, body })
      );

      // If successful, run onSuccess function (optional) and return data
      if (apiRequest.fulfilled.match(resultAction)) {
        const responseData = resultAction.payload.data as T; // Explicitly type data
        if (onSuccess) onSuccess(responseData);
        return { data: responseData };
      }

      return null; // Return null if the request fails
    },
    [dispatch, key, url, method, onSuccess]
  );

  // Auto-fetch when no existing data
  useEffect(() => {
    const noData = !existingData || existingData.length === 0;
    const loggedIn = user && isAuthenticated;
    if (loggedIn && noData && method === "GET") {
      sendRequest();
    }
  }, [existingData]);

  return { data, loading, error, sendRequest };
};

export default useApi;
