import { getCurrentUserAsync } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

const useGetUserById = (userId?: string) => {
  const queryFn =
    //  userId  ? () => getUserByIdAsync(userId):
    () => getCurrentUserAsync();

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["user", userId || "me"],
    queryFn,
  });

  return {
    user: data,
    isLoading,
    isError,
    isFetching,
    refetch,
  };
};

export default useGetUserById;
