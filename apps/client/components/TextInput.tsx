import React from "react";
import { KeyboardTypeOptions, StyleSheet, TextInput as TI } from "react-native";

interface TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  styles?: {};
}

export const TextInput = (props: TextInputProps) => {
  return <TI textAlignVertical="center" style={[styles.input, props.styles]} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
});
