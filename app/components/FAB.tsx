import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const FloatingActionButton: React.FC<{
	handlePress: () => void;
}> = ({ handlePress }) => {
	return (
		<TouchableOpacity
			onPress={handlePress}
			activeOpacity={0.7}
			testID="floatingActionButton"
			className={`bg-primary rounded-full flex justify-center items-center w-16 h-16 absolute bottom-10 right-5 z-50`}
		>
			<Entypo name="plus" size={32} color="white" />
		</TouchableOpacity>
	);
};

export default FloatingActionButton;
