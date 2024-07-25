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
	const { user, openProjectData, loading, saveUser } = useGlobalContext();
	const [firstName, setFirstName] = useState<string>(user.firstName);
	const [url, setUrl] = useState<string>(user.url);
	const [apiKey, setApiKey] = useState<string>(user.apiKey);
	const [theme, setTheme] = useState<string>(user.theme);
	const [openTheme, setOpenTheme] = useState<boolean>(false);
	const [projects, setProjects] = useState<string>("");
	const [statuses, setStatuses] = useState<string>("");
	const [types, setTypes] = useState<string>("");

	function handleSave() {
		if (firstName === "" || url === "" || apiKey === "" || theme === "") {
			Alert.alert("Bitte füllen Sie alle Felder aus.");
			return;
		}
		const projs: any = projects.split(",").map((p, i) => {
			return { id: i, value: p };
		});
		const stats: any = statuses.split(",").map((p, i) => {
			return { id: i, value: p };
		});
		const typs: any = types.split(",").map((p, i) => {
			return { id: i, value: p };
		});

		saveUser(
			firstName,
			url,
			apiKey,
			theme,
			projs,
			stats,
			typs,
			projects[0],
			statuses[0],
			types[0]
		);

		router.back();
	}

	return (
		<SafeAreaView className="bg-background p-4">
			<Loader isLoading={loading} />

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
				<Text className="text-white text-sm mt-5">
					URL der Openproject-Instanz
				</Text>
				<FormInput
					initialText={url}
					setTextInput={(text) => {
						setUrl(text);
					}}
					placeholder="URL"
				/>
				<Text className="text-white text-sm mt-5">
					API-Key der Openproject-Instanz
				</Text>
				<FormInput
					initialText={apiKey}
					setTextInput={(text) => {
						setApiKey(text);
					}}
					placeholder="API-Key"
				/>
				<View className="mt-5 z-50">
					<Text className="text-white text-sm">Theme auswählen</Text>

					<DropDownPicker
						value={theme}
						items={[
							{ label: "Hell", value: "Hell" },
							{ label: "Dunkel", value: "Dunkel" },
						]}
						multiple={false}
						theme="DARK"
						placeholder={
							theme === "" ? "Theme auswählen" : theme.toString()
						}
						setValue={(val) => {
							setTheme(val);
						}}
						open={openTheme}
						setOpen={() => setOpenTheme(!openTheme)}
					/>
				</View>
				<Text className="text-white text-sm mt-5">
					Projekte Kommagetrennt eintragen
				</Text>
				<FormInput
					initialText={projects}
					setTextInput={(text) => {
						setProjects(text);
					}}
					placeholder="Projekte (Standard zuerst)"
				/>
				<Text className="text-white text-sm mt-5">
					Aufgabenstatuse Kommagetrennt eintragen
				</Text>
				<FormInput
					initialText={statuses}
					setTextInput={(text) => {
						setStatuses(text);
					}}
					placeholder="Aufgabenstatus (Standard zuerst)"
				/>
				<Text className="text-white text-sm mt-5">
					Projekte Kommagetrennt eintragen
				</Text>
				<FormInput
					initialText={types}
					setTextInput={(text) => {
						setTypes(text);
					}}
					placeholder="Aufgabentypen (Standard zuerst)"
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
