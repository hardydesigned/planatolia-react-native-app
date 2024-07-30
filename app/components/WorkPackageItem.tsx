import { WorkPackage } from "@/lib/repository/@types/WorkPackage";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../context/GlobalProvider";

const WorkPackageItem: React.FC<{
	workPackage: WorkPackage;
	handlePress: () => void;
}> = ({ workPackage, handlePress }) => {
	const { deleteWorkPackage } = useGlobalContext();

	const [statusClass, setStatusClass] = useState<string>(
		"bg-secondaryBackground"
	);
	const [statusClassText, setStatusClassText] = useState<string>("");

	const [animateClass, setAnimateClass] = useState<string>("");

	const handleDeletePress = async () => {
		await deleteWorkPackage(workPackage.id);
	};

	useEffect(() => {
		if (workPackage?.status === "Abgeschlossen") {
			setStatusClass("bg-accent2");
			setStatusClassText("line-through text-accent2");
		}
		if (workPackage?.status === "In Bearbeitung") {
			setStatusClass("bg-tertiary");
			setStatusClassText("");
		}
		if (workPackage?.status === "Offen") {
			setStatusClass("bg-secondaryBackground");
			setStatusClassText("");
		}
	}, [workPackage]);

	return (
		<>
			<TouchableOpacity
				testID="workPackageItem"
				onPress={() => {
					handlePress();
					setAnimateClass("");
				}}
				onLongPress={() => {
					setAnimateClass("animate-ping -translate-x-8");
				}}
				activeOpacity={0.7}
				className={`${statusClass} rounded-xl pb-[6px] min-h-[62px] flex flex-row justify-center items-center w-full mb-2`}
			>
				<View
					className={`${animateClass} bg-background w-full an h-full rounded-xl p-2`}
				>
					<View className="flex  justify-between w-full flex-row">
						<Text
							className={`text-primaryText text-xs str ${statusClassText}`}
						>
							{workPackage?.project}
						</Text>
						<Text
							className={`text-primaryText text-xs ${statusClassText}`}
						>
							{workPackage?.type}
						</Text>
					</View>
					<Text
						className={`text-primaryText text-lg mt-1 ml-1 ${statusClassText}`}
					>
						{workPackage?.description}
					</Text>
				</View>
				{animateClass !== "" && (
					<TouchableOpacity
						onPress={handleDeletePress}
						testID="deleteButton"
					>
						<View className="w-16 -translate-x-8 pb-[6px] min-h-[62px] bg-red-700 rounded-xl flex items-center justify-center">
							<Ionicons
								name="trash-outline"
								size={24}
								color="white"
							/>
						</View>
					</TouchableOpacity>
				)}
			</TouchableOpacity>
		</>
	);
};

export default WorkPackageItem;
