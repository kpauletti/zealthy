import dayjs from "dayjs";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import type { Ticket } from "@/api/queries/tickets";

export const TicketCard = (props: { ticket: Ticket }) => {
  const { ticket } = props;
  return (
    <Pressable
      key={ticket.id}
      style={styles.ticket}
      onPress={() =>
        router.push({
          pathname: "/dashboard/tickets/[id]",
          params: { id: ticket.id },
        })
      }
    >
      <View style={styles.ticketHeader}>
        <Text>{dayjs(ticket.createdAt).format("MMM D, YYYY")}</Text>
        <Text>Status: {ticket.status}</Text>
      </View>
      <Text>{ticket.description}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ticket: {
    padding: 20,
    width: "100%",
    backgroundColor: "#e1e8ee",
    borderRadius: 10,
    shadowColor: "#ccc",
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
  },
});
