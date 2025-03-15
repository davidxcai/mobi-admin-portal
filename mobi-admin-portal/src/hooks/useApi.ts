import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store";

import { apiRequest } from "../redux/slices/apiSlice";

// Handles all API requests
const useApi = (
  key: string,
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  onSuccess?: (data: any) => void,
  existingData?: any
) => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux selectors
  const data = useSelector((state: RootState) => state.api.data[key]);
  const loading = useSelector((state: RootState) => state.api.loading[key]);
  const error = useSelector((state: RootState) => state.api.error[key]);

  // Send API request
  const sendRequest = useCallback(
    async (body?: any) => {
      const resultAction = await dispatch(
        apiRequest({ key, url, method, body })
      );

      if (apiRequest.fulfilled.match(resultAction) && onSuccess) {
        onSuccess(resultAction.payload.data);
      }
    },
    [dispatch, key, url, method, onSuccess]
  );

  // Auto-fetch when no existing data
  useEffect(() => {
    if (!existingData || existingData.length === 0) {
      sendRequest();
    }
  }, [existingData, sendRequest]);

  return { data, loading, error, sendRequest };
};

export default useApi;
