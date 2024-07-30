import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const FormField: React.FC<{
	title: string;
	value: string;
	placeholder: string;
	handleChangeText: Function;
	autoFocus?: boolean;
}> = ({ title, value, placeholder, handleChangeText, autoFocus }) => {
	return (
		<View className={`space-y-2`}>
			<Text className="text-base text-primaryText/90 font-medium">
				{title}
			</Text>

			<View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
				<TextInput
					className="flex-1 text-white font-psemibold text-base"
					value={value}
					placeholder={placeholder}
					placeholderTextColor="#7B7B8B"
					onChangeText={(e) => handleChangeText(e)}
					autoFocus={autoFocus}
				/>
			</View>
		</View>
	);
};

export default FormField;
