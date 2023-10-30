import { Image, Text, Chip } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useGetTicket } from "@/api/queries/tickets";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/Button";

export default function ViewTicket() {
  const { isAdmin } = useAuth();
  const { id, ...rest } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useGetTicket(id);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!data) {
    return <Text>Invalid ticket id</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Ticket Details</Text>

      {isAdmin && (
        <>
          <Text style={styles.title}>Name</Text>
          <Text>{data.user.name}</Text>

          <Text style={styles.title}>Email</Text>
          <Text>{data.user.email}</Text>
        </>
      )}

      <Text style={styles.title}>Description</Text>
      <Text>{data.description}</Text>

      <Text style={styles.title}>Status</Text>
      <Text>{data.status}</Text>

      {data.photo_url && (
        <Image
          source={{ uri: "http://localhost:3000/uploads/" + data.photo_url, cache: "reload" }}
          containerStyle={styles.photo}
          PlaceholderContent={<ActivityIndicator />}
        />
      )}

      {isAdmin && (
        <Button onPress={() => router.push(`/dashboard/tickets/resolve/${data.id}`)}>
          Resolve Ticket
        </Button>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  photo: {
    marginVertical: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginRight: 20,
  },
  status: {
    color: "#fff",
    backgroundColor: "#4caf50",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
