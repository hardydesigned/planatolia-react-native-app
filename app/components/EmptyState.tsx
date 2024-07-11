import { images } from "@/lib/domain/constants";
import { router } from "expo-router";
import { View, Text, Image } from "react-native";
import OutlinedButton from "./OutlinedButton";
import { Ionicons } from "@expo/vector-icons";

const EmptyState: React.FC<{
	title: string;
	subtitle: string;
}> = ({ title, subtitle }) => {
	return (
		<View className="flex justify-center items-center mt-40 px-4">
			<Ionicons
				name="information-circle-outline"
				size={48}
				color="white"
			/>
			<Text className="text-xl font-medium mt-5 text-gray-100">
				{title}
			</Text>
			<Text className="text-sm text-center font-semibold text-white mt-2">
				{subtitle}
			</Text>
		</View>
	);
};

export default EmptyState;
