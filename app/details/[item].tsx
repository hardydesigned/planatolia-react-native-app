import {
	View,
	Text,
	SafeAreaView,
	Touchable,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import RNDateTimePicker, {
	DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useGlobalContext } from "../context/GlobalProvider";
import { DataObject } from "@/lib/repository/@types/DataObject";
import FormField from "../components/FormField";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const WorkPackageItem = () => {
	const { query } = useLocalSearchParams();
	const { saveWorkPackage, workPackages, user } = useGlobalContext();
	const [description, setDescription] = useState<string>("");
	const [due_date, setDueDate] = useState<Date>(
		new Date(Date.now() + 604800000)
	);
	const [start_date, setStartDate] = useState<Date>(new Date(Date.now()));
	const [projects, setProjects] = useState<
		{ label: string; value: string }[]
	>([{ label: "Eingang", value: "0" }]);
	const [statuses, setStatuses] = useState<
		{ label: string; value: string }[]
	>([
		{ label: "Offen", value: "0" },
		{ label: "In Bearbeitung", value: "1" },
		{ label: "Abgeschlossen", value: "2" },
	]);
	const [types, setTypes] = useState<{ label: string; value: string }[]>([
		{ label: "Aufgabe", value: "0" },
		{ label: "Phase", value: "1" },
		{ label: "Meilenstein", value: "2" },
	]);
	const [project, setProject] = useState<string>("Eingang");
	const [status, setStatus] = useState<string>("Offen");
	const [type, setType] = useState<string>("Aufgabe");

	const [openProjects, setOpenProjects] = useState(false);
	const [openStatus, setOpenStatus] = useState(false);
	const [openType, setOpenType] = useState(false);

	const handlePress = () => {
		// saveWorkPackage(
		// 	1,
		// 	description,
		// 	due_date,
		// 	start_date,
		// 	project,
		// 	status,
		// 	type
		// );
	};

	const [items, setItems] = useState([
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
	]);

	useEffect(() => {
		if (
			query !== "new" &&
			query !== undefined &&
			typeof query === "string"
		) {
			const workPackage = workPackages.find(
				(wp) => wp.id === parseInt(query)
			);
			if (workPackage) {
				setDescription(workPackage.description);
				const startDate = new Date(workPackage.start_date);
				setStartDate(startDate);
				const dueDate = new Date(workPackage.due_date);
				setDueDate(dueDate);
				setProject(workPackage.project);
				setStatus(workPackage.status);
				setType(workPackage.type);
			}
		}
	}, []);

	return (
		<SafeAreaView className="bg-background h-full p-4">
			<View className="p-4">
				<View className="flex flex-row w-full justify-end items-center">
					<TouchableOpacity
						onPress={() => router.back()}
						className="mr-4"
					>
						<Ionicons name="save" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons name="close" size={32} color="white" />
					</TouchableOpacity>
				</View>
				<FormField
					title="Beschreibung"
					value={description}
					placeholder="Name der Aufgabe"
					handleChangeText={setDescription}
				/>
				<View className="mt-4">
					<Text className="text-base text-primaryText/90 font-medium">
						Start- und Enddatum auswählen:
					</Text>
					<View className="flex flex-row justify-around items-center mt-4">
						<RNDateTimePicker
							value={start_date}
							display="calendar"
						/>
						<Ionicons
							name="remove-outline"
							size={24}
							color="white"
						/>
						<RNDateTimePicker
							value={due_date!}
							display="calendar"
						/>
					</View>
				</View>

				<View className={`${openProjects === true ? "z-50" : ""} mt-4`}>
					<DropDownPicker
						value={project}
						items={projects}
						multiple={false}
						placeholder="Projekt auswählen"
						setValue={(val) => {
							setProject(val);
						}}
						open={openProjects}
						setOpen={() => setOpenProjects(!openProjects)}
					/>
				</View>

				<View className={`${openType === true ? "z-50" : ""} mt-4`}>
					<DropDownPicker
						value={type}
						items={types}
						multiple={false}
						placeholder="Typ auswählen"
						setValue={(val) => {
							setType(val);
						}}
						open={openType}
						setOpen={() => setOpenType(!openType)}
					/>
				</View>
				<View className={`${openStatus === true ? "z-50" : ""} mt-4`}>
					<DropDownPicker
						value={status}
						items={statuses}
						multiple={false}
						theme="DARK"
						placeholder="Status auswählen"
						setValue={(val) => {
							setStatus(val);
						}}
						open={openStatus}
						setOpen={() => setOpenStatus(!openStatus)}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default WorkPackageItem;
