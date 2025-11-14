import { router } from "expo-router";
import { useCallback } from "react";

const useProfile = () => {
  const handleGoEditProfile = useCallback(
    () => router.push("/profile/edit"),
    []
  );

  const handleGoSettings = useCallback(
    () => router.push("/profile/settings"),
    []
  );

  return {
    handleGoEditProfile,
    handleGoSettings,
  };
};
export default useProfile;
