import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Note = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

export default function Index() {
  const [notes, setNotes] = useState<Note[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, []),
  );

  const loadNotes = async () => {
    const data = await AsyncStorage.getItem("NOTES");
    const parsed: Note[] = data ? JSON.parse(data) : [];
    setNotes(parsed);
  };

  const deleteNote = async (id: string) => {
    const existingNotes = await AsyncStorage.getItem("NOTES");
    const notes = existingNotes ? JSON.parse(existingNotes) : [];

    const updated = notes.filter((note: Note) => note.id !== id);

    await AsyncStorage.setItem("NOTES", JSON.stringify(updated));
    setNotes(updated);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-4 py-2">
          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text className="text-4xl font-bold text-gray-800">My Notes</Text>
              <Text className="text-base text-gray-500 mt-1">
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/addNewNote")}
              className="bg-green-500 px-6 py-3 rounded-full shadow-lg"
            >
              <Text className="font-bold text-white text-base">+ Add</Text>
            </TouchableOpacity>
          </View>

          {notes.length === 0 ? (
            <View className="items-center justify-center py-20">
              <Text className="text-6xl mb-4">📝</Text>
              <Text className="text-xl font-semibold text-gray-600 mb-2">
                No Notes Yet
              </Text>
              <Text className="text-base text-gray-400 text-center">
                Create your first note to get started
              </Text>
            </View>
          ) : (
            <View className="gap-4">
              {notes.map((note) => (
                <View
                  key={note.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <View className="flex-row justify-between items-start mb-1">
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-gray-800 mb-1">
                        {note.title}
                      </Text>
                      <Text className="text-sm text-gray-500 mb-1">
                        {note.createdAt}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => deleteNote(note.id)}
                      className="bg-red-100 p-2 rounded-lg"
                    >
                      <Text className="text-lg">🗑️</Text>
                    </TouchableOpacity>
                  </View>

                  <View className="bg-gray-50 rounded-xl py-2 px-1">
                    <Text className="text-gray-700">
                      {note.description}
                    </Text>
                  </View>

                  <TouchableOpacity className="rounded-xl py-3 items-center">
                    <Text className="font-semibold">View Full</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
