import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image, AsyncStorage, Platform, StatusBar, ScrollView, Alert } from 'react-native';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
import socketio from 'socket.io-client';

export default function List() {
	const [ techs, setTechs ] = useState([]);

	useEffect(() => {
		AsyncStorage.getItem('user').then((user_id) => {
			const socket = socketio('http://192.168.2.93:19000', {
				query: { user_id }
			});

			socket.on('booking_request', (booking) => {
				Alert.alert(
					`Your booking on ${booking.spot.company} on ${booking.date} was ${booking.approved
						? 'APPROVED'
						: 'REJECTED'}`
				);
			});
		});
	}, []);

	useEffect(() => {
		AsyncStorage.getItem('techs').then((storagedTechs) => {
			const techsArray = storagedTechs.split(',').map((tech) => tech.trim());
			setTechs(techsArray);
		});
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Image source={logo} style={styles.logo} />

			<ScrollView>{techs.map((tech) => <SpotList tech={tech} key={tech} />)}</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		flex: 1
	},
	logo: {
		height: 32,
		resizeMode: 'contain',
		marginTop: 10,
		alignSelf: 'center'
	}
});
