import { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import { Stack, SplashScreen } from "expo-router";
import GlobalProvider, { useGlobalContext } from "./context/GlobalProvider";
import { Alert } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const [fontsLoaded, fontError] = useFonts({
		"SFDisplay-Bold": require("../assets/fonts/SanFranciscoDisplay-Bold.otf"),
		"SFDisplay-Light": require("../assets/fonts/SanFranciscoDisplay-Light.otf"),
		"SFDisplay-Medium": require("../assets/fonts/SanFranciscoDisplay-Medium.otf"),
		"SFDisplay-Regular": require("../assets/fonts/SanFranciscoDisplay-Regular.otf"),
		"SFText-Bold": require("../assets/fonts/SanFranciscoText-Bold.otf"),
		"SFText-Light": require("../assets/fonts/SanFranciscoText-Light.otf"),
		"SFText-Medium": require("../assets/fonts/SanFranciscoText-Medium.otf"),
		"SFText-Regular": require("../assets/fonts/SanFranciscoText-Regular.otf"),
	});

	const { error, errorMessage } = useGlobalContext();

	if (error) return Alert.alert("Fehler", errorMessage);

	useEffect(() => {
		if (fontError) throw error;

		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded) {
		return null;
	}

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<GlobalProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="home" options={{ headerShown: false }} />
				<Stack.Screen name="details" options={{ headerShown: false }} />
				<Stack.Screen
					name="settings"
					options={{ headerShown: false }}
				/>
			</Stack>
		</GlobalProvider>
	);
};

export default RootLayout;
