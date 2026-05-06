import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 items-center">
      <ScrollView>
        <View className="w-full px-5 flex-row items-center justify-between">
          <View className="border-2 border-green-500 px-4 py-2 rounded-lg">
            <Text className="text-xl text-green-500 font-semibold">Note APP</Text>
          </View>
          <TouchableOpacity onPress={()=>router.push('/addNewNote')} className="bg-green-500 px-4 py-2 rounded-lg">
            <Text className="text-lg font-bold text-white">Add New Note</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
