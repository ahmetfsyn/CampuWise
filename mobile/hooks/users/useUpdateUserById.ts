import { updateUserByIdAsync } from "@/services/user.service";
import useUserStore from "@/store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateUserById = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useUserStore((state) => state);
  const mutation = useMutation<any, Error, any>({
    mutationFn: updateUserByIdAsync,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["user", "me"], updatedUser);
      updateUser(updatedUser);

      // queryClient.invalidateQueries({
      //   queryKey: ["user", "me"],
      // });
    },
  });

  return {
    handleUpdateUserById: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};

export default useUpdateUserById;
