import { Stack } from "expo-router";
import "./../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
      <Stack.Screen
        name="addNewNote"
        options={{ headerTitle: "Add New Note" }}
      />
    </Stack>
  );
}
