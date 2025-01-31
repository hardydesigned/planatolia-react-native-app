import {
	View,
	Text,
	SafeAreaView,
	Touchable,
	TouchableOpacity,
	StatusBar,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import RNDateTimePicker, {
	DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useGlobalContext } from "../context/GlobalProvider";
import FormField from "../components/FormField";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import FilledButton from "../components/FilledButton";

const WorkPackageItem = () => {
	const path = usePathname();
	const { saveWorkPackage, workPackages, user } = useGlobalContext();
	const [id, setID] = useState<number>(0);
	const [description, setDescription] = useState<string>("");
	const [due_date, setDueDate] = useState<Date>(
		new Date(Date.now() + 86400000)
	);
	const [start_date, setStartDate] = useState<Date>(new Date(Date.now()));
	const [projects, setProjects] = useState<
		{ label: string; value: string }[]
	>([]);
	const [statuses, setStatuses] = useState<
		{ label: string; value: string }[]
	>([]);
	const [types, setTypes] = useState<{ label: string; value: string }[]>([]);

	const [project, setProject] = useState<string>("");
	const [status, setStatus] = useState<string>("");
	const [type, setType] = useState<string>("");

	const [openProjects, setOpenProjects] = useState(false);
	const [openStatus, setOpenStatus] = useState(false);
	const [openType, setOpenType] = useState(false);

	const handleSave = async () => {
		if (
			description === "" ||
			project === "" ||
			status === "" ||
			type === ""
		) {
			Alert.alert("Erst alle Felder ausfüllen!");
		} else {
			router.back();
		}
		await saveWorkPackage(
			id,
			description,
			due_date.toISOString(),
			start_date.toISOString(),
			project,
			status,
			type
		);
	};

	useEffect(() => {
		if (path === undefined || path === null || path === "new") {
			return;
		}

		setProjects((prev) =>
			user.projects.map((project: string) => {
				return {
					label: project,
					value: project,
				};
			})
		);
		setProject(user.projects[0]);

		setStatuses((prev) =>
			user.statuses.map((status: string) => {
				return {
					label: status,
					value: status,
				};
			})
		);
		setStatus(user.statuses[0]);

		setTypes((prev) =>
			user.types.map((type: string) => {
				return {
					label: type,
					value: type,
				};
			})
		);
		setType(user.types[0]);

		const wpId = path.substring(path.lastIndexOf("/") + 1);

		if (wpId !== "new" && wpId !== undefined && typeof wpId === "string") {
			const workPackage = workPackages.find(
				(wp) => wp.id === parseInt(wpId)
			);

			if (workPackage) {
				setID(workPackage.id);
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
		<SafeAreaView
			className="bg-background h-full p-4 flex flex-col justify-between"
			testID="workPackageItem"
		>
			<View className="p-4">
				<View className="flex flex-row w-full justify-end items-center">
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons name="close" size={32} color="white" />
					</TouchableOpacity>
				</View>
				<FormField
					title="Beschreibung"
					value={description}
					placeholder="Name der Aufgabe"
					handleChangeText={setDescription}
					autuFocus={true}
				/>
				<View className="mt-4">
					<Text className="text-base text-primaryText/90 font-medium">
						Start- und Enddatum auswählen:
					</Text>
					<View className="flex flex-row justify-around items-center mt-4">
						<RNDateTimePicker
							value={start_date}
							display="calendar"
							onChange={(event, selectedDate) => {
								if (selectedDate) setStartDate(selectedDate);
							}}
						/>
						<Ionicons
							name="remove-outline"
							size={24}
							color="white"
						/>
						<RNDateTimePicker
							value={due_date!}
							display="calendar"
							onChange={(event, selectedDate) => {
								if (selectedDate) setDueDate(selectedDate);
							}}
						/>
					</View>
				</View>

				<View className={`${openProjects === true ? "z-50" : ""} mt-4`}>
					<DropDownPicker
						value={project}
						items={projects}
						multiple={false}
						placeholder={
							project === ""
								? "Projekt auswählen"
								: project.toString()
						}
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
						placeholder={
							type === "" ? "Typ auswählen" : type.toString()
						}
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
						placeholder={
							status === ""
								? "Status auswählen"
								: status.toString()
						}
						setValue={(val) => {
							setStatus(val);
						}}
						open={openStatus}
						setOpen={() => setOpenStatus(!openStatus)}
					/>
				</View>
			</View>
			<View className="p-4">
				<FilledButton
					title="Speichern"
					handlePress={() => {
						handleSave();
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

export default WorkPackageItem;
