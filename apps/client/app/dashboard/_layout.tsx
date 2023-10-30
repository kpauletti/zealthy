import { Redirect } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { useAuth } from "@/context/auth";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AppLayout() {
  const { user } = useAuth();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  const isAdmin = user.role === "admin";

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "View Tickets",
          href: "/dashboard",
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="tickets/new-ticket"
        options={{
          headerShown: false,
          title: "New Ticket",
          href: isAdmin ? null : "/dashboard/tickets/new-ticket", //we can hide this screen from admins
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="file-tray" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          href: "/dashboard/profile",
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="person" size={size} color={color} />;
          },
        }}
      />

      {/* -------------------------------------------------------------------------- */
      /*                      Screens hidden from Tab navigator                     */
      /* -------------------------------------------------------------------------- */}

      <Tabs.Screen name="tickets/[id]" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="tickets/resolve/[id]" options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}
