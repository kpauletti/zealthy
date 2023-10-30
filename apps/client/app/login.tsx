import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "@rneui/themed";
import { useAuth } from "@/context/auth";
import { router } from "expo-router";
import { Button } from "@/components/Button";

/**
 * Login screen.
 * Effect will redirect to home if user if/when user is logged in.
 */

const LoginScreen = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button
        title="Forgot Password"
        type="clear"
        onPress={() => alert("Oops, This feature is not implemented yet.")}
      />
      <Button title="Login" onPress={() => login(email, password)} />
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

export default LoginScreen;
