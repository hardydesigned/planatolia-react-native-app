import { View, ActivityIndicator, Dimensions, Platform } from "react-native";

const Loader: React.FC<{ isLoading: boolean; testID: string }> = ({
	isLoading,
	testID,
}) => {
	const osName = Platform.OS;
	const screenHeight = Dimensions.get("screen").height;

	if (!isLoading) return null;

	return (
		<View
			className="absolute flex justify-center items-center w-full h-full bg-background/60 z-10"
			style={{
				height: screenHeight,
			}}
			testID={testID}
		>
			<ActivityIndicator
				animating={isLoading}
				color="#fff"
				size={osName === "ios" ? "large" : 50}
				testID="activityIndicator"
			/>
		</View>
	);
};

export default Loader;
