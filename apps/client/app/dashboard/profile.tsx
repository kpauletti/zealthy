import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@/components/Button";
import { useAuth } from "@/context/auth";

const Profile = () => {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderRadius: 10,
    borderColor: "#000",
  },
});

export default Profile;
