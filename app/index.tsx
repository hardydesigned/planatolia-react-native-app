import { View, Text, ScrollView, Image, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../lib/domain/constants";
import React, { useEffect } from "react";
import OutlinedButton from "./components/OutlinedButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "./context/GlobalProvider";
import Loader from "./components/Loader";
import { projects, statuses, types } from "@/lib/domain/constants/standards";

const StartPage = () => {
	const { loading, saveUser, getCurrentUser } = useGlobalContext();

	useEffect(() => {
		async function init() {
			const username = await getCurrentUser();
			if (username.firstName !== "") {
				router.replace("/home");
			}
		}
		init();
	}, []);

	return (
		<SafeAreaView className="bg-background h-full p-4">
			<Loader isLoading={loading} />

			<ScrollView>
				<Text className="text-white text-center text-4xl font-dbold mt-20">
					Willkommen bei Planatolia!
				</Text>
				<View className="flex items-center mt-10">
					<Image
						source={images.darkdog}
						className="w-[350px] h-[300px]"
						resizeMode="contain"
					/>
					<View className="mt-20">
						<OutlinedButton
							title="Starten"
							handlePress={() => {
								router.replace("/settings");
								saveUser("", projects, statuses, types);
							}}
							containerStyles=""
							textStyles=""
							isLoading={false}
						></OutlinedButton>
					</View>
				</View>
			</ScrollView>

			<StatusBar backgroundColor="#161622" />
		</SafeAreaView>
	);
};

export default StartPage;
