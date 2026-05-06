import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const AddNewNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const newNote = {
        id: Date.now().toString(),
        title,
        description,
        createdAt: new Date().toISOString().split("T")[0],
    }
    console.log("Note saved:", newNote);
    setTitle("");
    setDescription("");
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        className="bg-gradient-to-b from-emerald-700 to-emerald-600"
      >
        <View className="flex-1 px-3">
          <View className="mb-4">
            <Text className="text-2xl font-bold text-gray-800">
              Create Note
            </Text>
            <Text className="text-base text-gray-500">
              Add a new note to your collection
            </Text>
          </View>

          <TextInput
            className="bg-gray-50 rounded-xl px-3 py-3 text-base border border-gray-300 mb-2"
            placeholder="Title"
            placeholderTextColor="gray"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            className="flex-1 bg-gray-50 rounded-xl px-4 py-4 text-base border border-gray-300"
            placeholder="Write your note here..."
            placeholderTextColor="gray"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />

          <View className="flex-row gap-3 py-3">
            <TouchableOpacity className="flex-1 bg-gray-500 rounded-xl py-4 items-center">
              <Text className="text-base font-semibold text-white">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              className="flex-1 bg-blue-500 rounded-xl py-4 items-center"
            >
              <Text className="text-base font-semibold text-white">
                Save Note
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddNewNote;
