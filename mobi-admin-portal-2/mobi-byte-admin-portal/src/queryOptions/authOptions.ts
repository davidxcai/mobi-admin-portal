import { queryOptions } from "@tanstack/react-query";
import { loginUser } from "./apiCalls";

export default function loginUserOptions() {
  return queryOptions({
    queryKey: ["user"],
    queryFn: loginUser,
  });
}
