import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Image, Text } from "@rneui/themed";
import { TextInput } from "@/components/TextInput";
import { useAuth } from "@/context/auth";
import { router } from "expo-router";
import { useCreateTicket } from "@/api/queries/tickets";
import { usePhotoPicker } from "@/hooks/usePhotoPicker";
import { Button } from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

const TicketForm = () => {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const { photo, pickPhoto, clearPhoto } = usePhotoPicker();
  const { mutate: createTicket, isSuccess } = useCreateTicket();

  React.useEffect(() => {
    if (isSuccess) {
      setDescription("");
      clearPhoto();
      router.push("/dashboard/");
    }
  }, [isSuccess]);

  const handleSubmit = () => {
    if (!description) {
      alert("Please fill out all fields");
      return;
    }

    const formData = new FormData();
    formData.append("email", user?.email || "");
    formData.append("user_id", user?.id || "");
    formData.append("description", description);

    if (photo) {
      // @ts-ignore
      formData.append("photo", {
        name: photo.split("/").pop(),
        type: "image/jpeg",
        uri: photo,
      });
    }

    createTicket(formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Submit a Ticket</Text>
      <View style={styles.formContainer}>
        {photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.photo} />
          </View>
        )}
        <TextInput
          styles={{ height: 100, marginBottom: 20 }}
          multiline
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Button title={photo ? "Change Photo" : "Pick Photo"} onPress={pickPhoto} />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  photoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  photo: {
    width: 200,
    height: 200,
  },
});

export default TicketForm;
