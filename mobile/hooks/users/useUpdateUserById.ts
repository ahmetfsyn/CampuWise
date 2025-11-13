import { updateUserByIdAsync } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";

const useUpdateUserById = () => {
  const mutation = useMutation<any, Error, any>({
    mutationFn: updateUserByIdAsync,
  });

  return {
    handleUpdateUserById: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
};

export default useUpdateUserById;
