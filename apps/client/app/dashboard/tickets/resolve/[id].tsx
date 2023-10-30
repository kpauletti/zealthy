import { router, useLocalSearchParams } from "expo-router";
import { useGetTicket, useUpdateTicket, type Ticket } from "@/api/queries/tickets";
import React, { useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator, SafeAreaView } from "react-native";
import { Input } from "@rneui/themed";
import { Button } from "@/components/Button";
import { Picker } from "@react-native-picker/picker";

const TicketDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetTicket(id);
  const { mutate: updateTicket, isSuccess } = useUpdateTicket();
  const [resolution, setResolution] = useState(data?.resolution || "");
  const [status, setStatus] = useState<Ticket["status"]>(data?.status || "new");

  const handleSave = () => {
    console.log({ id, resolution, status });
    updateTicket({ id, resolution, status });
  };

  React.useEffect(() => {
    if (isSuccess) {
      router.replace("/dashboard/");
    }
  }, [isSuccess]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (!data) {
    return <Text>Invalid ticket id</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20 }}>
        <Input
          multiline
          style={{ height: 100 }}
          label="Resolution"
          value={resolution}
          onChangeText={setResolution}
        />
        <Text>Status</Text>
        <Picker
          mode="dropdown"
          selectedValue={status}
          onValueChange={itemValue => setStatus(itemValue)}
        >
          <Picker.Item label="New" value="new" />
          <Picker.Item label="In Progress" value="in_progress" />
          <Picker.Item label="Resolved" value="resolved" />
        </Picker>

        <Button onPress={handleSave} title="Save Ticket" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
});

export default TicketDetailsScreen;
