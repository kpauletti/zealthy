import { Text, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useGetTickets } from "@/api/queries/tickets";
import { SafeAreaView } from "react-native-safe-area-context";
import { TicketCard } from "@/components/TicketCard";

export default function Dashboard() {
  const { data: tickets, isLoading } = useGetTickets();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {tickets?.length === 0 && (
          <View style={styles.alignCenter}>
            <Text style={styles.text}>You have no tickets.</Text>
          </View>
        )}
        {tickets?.map((ticket: any) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 15,
  },
  alignCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
