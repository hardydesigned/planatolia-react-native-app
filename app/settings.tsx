import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { router } from "expo-router";
import { useGlobalContext } from "./context/GlobalProvider";
import Loader from "./components/Loader";
import { Ionicons } from "@expo/vector-icons";
import FilledButton from "./components/FilledButton";
import FormInput from "./components/FormInput";

const Settings = () => {
	const { user, openProjectData, loading } = useGlobalContext();

	return (
		<SafeAreaView className="bg-background h-full p-4">
			<Loader isLoading={loading} />

			<View className="flex flex-row gap-4">
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="close-outline" size={32} color="white" />
				</TouchableOpacity>
			</View>
			<View className="flex flex-col justify-between h-[80vh] items-center mt-10">
				<View>
					<Text className="text-white text-sm">Name</Text>
					<FormInput
						initialText={user.firstName}
						setTextInput={() => {}}
						placeholder="Benutzername"
					/>
					<Text className="text-white text-sm mt-5">
						URL der Openproject-Instanz
					</Text>
					<FormInput
						initialText={openProjectData?.url}
						setTextInput={() => {}}
						placeholder="URL"
					/>
					<Text className="text-white text-sm mt-5">
						API-Key der Openproject-Instanz
					</Text>
					<FormInput
						initialText={openProjectData?.apiKey}
						setTextInput={() => {}}
						placeholder="API-Key"
					/>
				</View>
				<FilledButton
					title="Speichern"
					handlePress={() => {
						router.back();
					}}
					containerStyles={""}
					textStyles={""}
					isLoading={false}
				/>
			</View>

			<StatusBar backgroundColor="#161622" />
		</SafeAreaView>
	);
};

export default Settings;
