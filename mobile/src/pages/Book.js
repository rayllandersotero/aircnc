import React, { useState } from 'react';
import {
	AsyncStorage,
	Alert,
	SafeAreaView,
	StyleSheet,
	Platform,
	StatusBar,
	KeyboardAvoidingView,
	View,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
	const [ date, setDate ] = useState('');
	const id = navigation.getParam('id');

	async function handleSubmit() {
		const user_id = await AsyncStorage.getItem('user');

		await api.post(
			`/spots/${id}/booking`,
			{
				date
			},
			{
				headers: { user_id }
			}
		);

		Alert.alert('Solicitação de reserva enviada.');

		navigation.navigate('List');
	}

	function handeCancel() {
		navigation.navigate('List');
	}

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView behavior="padding">
				<View style={styles.form}>
					<Text style={styles.label}>Your data of interest: *</Text>
					<TextInput
						style={styles.input}
						placeholder="What date do you want to book?"
						placeholderTextColor="#999"
						autoCapitalize="words"
						autoCorrect={false}
						value={date}
						onChangeText={setDate}
					/>

					<TouchableOpacity style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText}>Booking</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[ styles.button, styles.buttonCancel ]} onPress={handeCancel}>
						<Text style={[ styles.buttonText, styles.buttonTextCancel ]}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		flex: 1
	},
	form: {
		alignSelf: 'stretch',
		paddingHorizontal: 30,
		marginTop: 30
	},
	label: {
		fontWeight: 'bold',
		color: '#444',
		marginBottom: 8
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		paddingHorizontal: 20,
		fontSize: 16,
		color: '#444',
		height: 44,
		marginBottom: 20,
		borderRadius: 2
	},
	button: {
		height: 42,
		backgroundColor: '#f05a5b',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16
	},
	buttonCancel: {
		backgroundColor: '#eee',
		marginTop: 10
	},
	buttonTextCancel: {
		color: '#888'
	}
});
