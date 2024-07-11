import { View, TextInput } from "react-native";

const FormInput: React.FC<{
	initialText?: string;
	placeholder?: string;
	setTextInput: (text: string) => void;
}> = ({ initialText, setTextInput, placeholder }) => {
	return (
		<View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
			<TextInput
				className="text-base mt-0.5 text-white flex-1 font-pregular"
				value={initialText}
				placeholder={placeholder}
				placeholderTextColor="#CDCDE0"
				onChangeText={(e) => setTextInput(e)}
			/>
		</View>
	);
};

export default FormInput;
