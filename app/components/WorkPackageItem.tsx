import { WorkPackage } from "@/lib/repository/@types/WorkPackage";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const WorkPackageItem: React.FC<{
	workPackage: WorkPackage;
	handlePress: () => void;
}> = ({ workPackage, handlePress }) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-primary rounded-xl pb-[6px] min-h-[62px] flex flex-row justify-center items-center w-full mb-2`}
		>
			<View className="bg-secondaryBackground w-full h-full rounded-xl p-2">
				<View className="flex justify-between w-full flex-row">
					<Text className={`text-primaryText text-xs`}>
						{workPackage.project.value}
					</Text>
					<Text className={`text-primaryText text-xs`}>
						{workPackage.type.value}
					</Text>
				</View>
				<Text className={`text-primaryText text-lg mt-1 ml-1`}>
					{workPackage.description}
				</Text>
			</View>
		</TouchableOpacity>
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
