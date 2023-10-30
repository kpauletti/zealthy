import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export const usePhotoPicker = () => {
  const [photo, setPhoto] = useState<string | null>(null);

  const clearPhoto = () => setPhoto(null);

  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return { photo, pickPhoto, clearPhoto };
};
