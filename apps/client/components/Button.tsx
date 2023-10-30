import { Button as RNEButton, type ButtonProps } from "@rneui/themed";

export const Button = (props: ButtonProps) => {
  return (
    <RNEButton
      raised
      buttonStyle={{ paddingHorizontal: 20, borderRadius: 30 }}
      containerStyle={{ marginVertical: 10, borderRadius: 30 }}
      titleStyle={{ fontWeight: "bold" }}
      {...props}
    />
  );
};
