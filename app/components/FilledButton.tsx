import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

const FilledButton: React.FC<{
	title: string;
	handlePress: () => void;
	containerStyles: string;
	textStyles: string;
	isLoading: boolean;
}> = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			className={`bg-primary-100 rounded-xl pb-[6px] min-h-[62px] flex flex-row justify-center items-center w-full ${containerStyles} ${
				isLoading ? "opacity-50" : ""
			}`}
			disabled={isLoading}
		>
			<View className="bg-primary w-full h-full rounded-xl  flex items-center">
				<Text
					className={`text-primaryText text-lg ${textStyles} mt-3  text-center`}
				>
					{title}
				</Text>
			</View>

			{isLoading && (
				<ActivityIndicator
					animating={isLoading}
					color="#fff"
					size="small"
					className="ml-2"
				/>
			)}
		</TouchableOpacity>
	);
};

export default FilledButton;
