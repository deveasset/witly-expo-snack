import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SUCCESS_UPDATE, ERROR_UPDATE } from '../constants/Globals';
import MessageBoxStyle from './../styles/component/MessageBoxStyle';

export function DoneMessageBox(message, SetStatusBadge) {
	return (
		<View style={[MessageBoxStyle.badge, MessageBoxStyle.successBadge]}>
			<MaterialIcon name="done" size={30} color="#75b82a" style={{ marginEnd: 10 }} />
			<Text style={{ fontSize: 16 }}>{SUCCESS_UPDATE}</Text>
			<TouchableOpacity onPress={() => SetStatusBadge()}>
				<MaterialIcon name="close" size={20} color="#b5b5b5" style={{ marginStart: 5 }} />
			</TouchableOpacity>
		</View>
	);
}

export function ErrorMessageBox(message, SetStatusBadge) {
	return (
		<View style={[MessageBoxStyle.badge, MessageBoxStyle.errorBadge]}>
			<MaterialIcon name="error" size={30} color="#a6221b" style={{ marginEnd: 10 }} />
			<Text style={{ fontSize: 16 }}>{ERROR_UPDATE}</Text>
			<TouchableOpacity onPress={() => SetStatusBadge()}>
				<MaterialIcon name="close" size={20} color="#b5b5b5" style={{ marginStart: 5 }} />
			</TouchableOpacity>
		</View>
	);
}
