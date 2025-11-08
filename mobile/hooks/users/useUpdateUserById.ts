import { updateUserByIdAsync } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";

const useUpdateUserById = () => {
  const {} = useMutation({
    mutationFn: updateUserByIdAsync,
  });
};

export default useUpdateUserById;
