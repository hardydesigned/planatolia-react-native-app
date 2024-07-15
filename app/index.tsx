import { View, Text, ScrollView, Image, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../lib/domain/constants";
import React from "react";
import FilledButton from "./components/FilledButton";
import OutlinedButton from "./components/OutlinedButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "./context/GlobalProvider";
import Loader from "./components/Loader";

const StartPage = () => {
	const { loading, isLoggedIn, error, errorMessage } = useGlobalContext();

	if (!loading && isLoggedIn) return <Redirect href="/home" />;

	return (
		<SafeAreaView className="bg-background h-full p-4">
			<Loader isLoading={loading} />

			<ScrollView
				contentContainerStyle={{
					height: "100%",
				}}
			>
				<Text className="text-white text-center text-4xl font-dbold mt-20">
					Willkommen bei Planatolia!
				</Text>
				<View className="flex items-center mt-10 px-5">
					<Image
						source={images.darkdog}
						className="w-[350px] h-[300px]"
						resizeMode="contain"
					/>
					<View className="mt-10">
						<OutlinedButton
							title="Ohne Openproject starten"
							handlePress={() => router.push("/home")}
							containerStyles=""
							textStyles=""
							isLoading={false}
						></OutlinedButton>
						<FilledButton
							title="Openproject aktivieren"
							handlePress={() => {
								router.push("/settings");
							}}
							containerStyles=""
							textStyles=""
							isLoading={false}
						></FilledButton>
					</View>
				</View>
			</ScrollView>

			<StatusBar backgroundColor="#161622" />
		</SafeAreaView>
	);
};

export default StartPage;
