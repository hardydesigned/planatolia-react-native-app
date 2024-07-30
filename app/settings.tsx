// Not tested

import { View, Text, StatusBar, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useGlobalContext } from "./context/GlobalProvider";
import Loader from "./components/Loader";
import { Ionicons } from "@expo/vector-icons";
import FilledButton from "./components/FilledButton";
import FormInput from "./components/FormInput";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";

const Settings = () => {
	const { user, loading, saveUser } = useGlobalContext();
	const [firstName, setFirstName] = useState<string>("");
	const [projects, setProjects] = useState<string>("");
	const [statuses, setStatuses] = useState<string>("");
	const [types, setTypes] = useState<string>("");

	function handleSave() {
		if (firstName === "") {
			Alert.alert("Bitte gebe zumindest einen Benutzernamen an.");
			return;
		}
		const projs: any = projects.split(",");
		const stats: any = statuses.split(",");
		const typs: any = types.split(",");

		saveUser(firstName, projs, stats, typs);

		router.push("/home");
	}

	useEffect(() => {
		setFirstName(user.firstName);
		setProjects(user.projects.join(","));
		setStatuses(user.statuses.join(","));
		setTypes(user.types.join(","));
	}, [user]);

	return (
		<SafeAreaView className="bg-background p-4">
			<Loader isLoading={loading} testID="loader" />

			<View className="flex flex-row w-full justify-end items-center pb-10">
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="close" size={32} color="white" />
				</TouchableOpacity>
			</View>
			<ScrollView className="flex flex-col h-[80vh]">
				<Text className="text-white text-sm">Name</Text>
				<FormInput
					initialText={firstName}
					setTextInput={(text) => {
						setFirstName(text);
					}}
					placeholder="Benutzername"
				/>
				<Text className="text-white text-sm mt-5">Projekte</Text>
				<FormInput
					initialText={projects}
					setTextInput={(text) => {
						setProjects(text);
					}}
					placeholder="Projekte (Standard zuerst, kommagetrennt)"
				/>
				<Text className="text-white text-sm mt-5">Aufgabenstatuse</Text>
				<FormInput
					initialText={statuses}
					setTextInput={(text) => {
						setStatuses(text);
					}}
					placeholder="Aufgabenstatus (Standard zuerst, kommagetrennt)"
				/>
				<Text className="text-white text-sm mt-5">Aufgabentypen</Text>
				<FormInput
					initialText={types}
					setTextInput={(text) => {
						setTypes(text);
					}}
					placeholder="Aufgabentypen (Standard zuerst, kommagetrennt)"
				/>
				<View className="py-10">
					<FilledButton
						title="Speichern"
						handlePress={handleSave}
						containerStyles={""}
						textStyles={""}
						isLoading={false}
					/>
				</View>
			</ScrollView>

			<StatusBar backgroundColor="#161622" />
		</SafeAreaView>
	);
};

export default Settings;
