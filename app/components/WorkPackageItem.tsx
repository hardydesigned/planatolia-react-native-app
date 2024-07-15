import { WorkPackage } from "@/lib/repository/@types/WorkPackage";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	ActivityIndicator,
	Animated,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import FilterBottomSheet from "./FilterBottomSheet";
import FilledButton from "./FilledButton";
import OutlinedButton from "./OutlinedButton";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../context/GlobalProvider";
import { Swipeable } from "react-native-gesture-handler";

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
		if (workPackage?.status?.value === "Abgeschlossen") {
			setStatusClass("bg-accent2");
			setStatusClassText("line-through text-accent2");
		}
		if (workPackage?.status?.value === "In Bearbeitung") {
			setStatusClass("bg-tertiary");
		}
	}, [workPackage]);

	return (
		<>
			<TouchableOpacity
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
							{workPackage?.project?.value}
						</Text>
						<Text
							className={`text-primaryText text-xs ${statusClassText}`}
						>
							{workPackage?.type?.value}
						</Text>
					</View>
					<Text
						className={`text-primaryText text-lg mt-1 ml-1 ${statusClassText}`}
					>
						{workPackage?.description}
					</Text>
				</View>
				{animateClass !== "" && (
					<TouchableOpacity onPress={handleDeletePress}>
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

// id: number;
// description: string;
// due_date: string;
// created_at: string;
// updated_at: string;
// start_date: string;
// project: OpenProjectDataObject;
// status: OpenProjectDataObject;
// type: OpenProjectDataObject;
