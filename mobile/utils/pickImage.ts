import { ImagePickerOptions, launchImageLibraryAsync } from "expo-image-picker";

const pickImage = async (options?: ImagePickerOptions) => {
  const result = await launchImageLibraryAsync(options);

  if (!result.canceled) {
    return result.assets[0];
  }
};

export default pickImage;
