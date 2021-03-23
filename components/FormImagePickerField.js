/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, ActivityIndicator, Image, View, Pressable } from 'react-native';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import ThemeColor from '../constants/ThemeColor';
import * as ImagePicker from 'expo-image-picker';
import { ExtractFileNameFromURI, validURL } from '../helper/StringUtils';
import { IsEmptyOrNullOrUndefined, isObjectEmpty } from '../helper/StringUtils';

export const FormImagePickerField = (props) => {
	const { name, rules, defaultValue = '', ...imageProps } = props;

	const formContext = useFormContext();
	const { control, errors } = formContext;

	const { field } = useController({ name, control, rules, defaultValue });
	return (
		<ImagePickerField
			{...imageProps}
			onValueChange={(value) => {
				field.onChange(value);
			}}
			onBlur={field.onBlur}
			value={field.value}
		/>
	);
};

export const ImagePickerField = ({ error, onValueChange, onBlur, ...imageProps }) => {
	const [imageInfo, setImageInfo] = React.useState(imageProps?.value);

	/*{ cancelled: false, type: 'image', uri, width, height, exif, base64 } */
	let openImagePickerAsync = async () => {
		let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (permissionResult.granted === false) {
			alert('Permission to access camera roll is required!');
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync();
		setImageInfo(
			pickerResult?.cancelled
				? {}
				: {
						Name: ExtractFileNameFromURI(pickerResult.uri),
						Url: pickerResult.uri
				  }
		);
	};

	let openCameraAsync = async () => {
		let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (permissionResult.granted === false) {
			alert('Permission to access camera roll is required!');
			return;
		}

		let cameraResult = await ImagePicker.launchCameraAsync();
		setImageInfo(
			cameraResult?.cancelled
				? {}
				: {
						Name: ExtractFileNameFromURI(cameraResult.uri),
						Url: cameraResult.uri
				  }
		);
	};

	const imgUrl = IsEmptyOrNullOrUndefined(imageInfo?.Url) ? imageInfo['Image Url'] : imageInfo?.Url;
	const imgSource = IsEmptyOrNullOrUndefined(imgUrl) ? {} : { uri: imgUrl };
	return (
		<View
			style={{
				paddingVertical: 10,
				paddingHorizontal: 16,
				borderRadius: 4,
				borderColor: '#cecece',
				borderWidth: 1
			}}>
			{isObjectEmpty(imageInfo) ? (
				<View>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Text style={{ color: '#bcbcbc' }}>Upload a image file.</Text>
						<Icon name="cloud-upload-outline" size={50} color="#bcbcbc" />
					</View>
					<View style={styles.btnContainer}>
						<Pressable
							style={({ pressed }) => [
								{
									backgroundColor: pressed ? ThemeColor.INPUT_PRESSED : ThemeColor.INPUT_DEFAULT
								},
								styles.iconBtn
							]}
							onPress={openCameraAsync}>
							<Icon name="camera" size={30} color="#6e6e6e" />
						</Pressable>
						<Text style={{ marginHorizontal: 16, color: '#bcbcbc' }}>Or</Text>
						<Pressable
							style={({ pressed }) => [
								{
									backgroundColor: pressed ? ThemeColor.INPUT_PRESSED : ThemeColor.INPUT_DEFAULT
								},
								styles.iconBtn
							]}
							onPress={openImagePickerAsync}>
							<Icon name="image" size={30} color="#6e6e6e" />
						</Pressable>
					</View>
				</View>
			) : (
				<View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}>
						<Image
							source={imgSource}
							resizeMode="center"
							width="100%"
							style={{ height: 200, width: 200, borderWidth: 5 }}
						/>
						<Pressable onPress={() => setImageInfo({})}>
							<Icon name="close-circle" size={30} color="red" style={{ zIndex: 1 }} />
						</Pressable>
					</View>
					<Text style={{ marginTop: 5 }}>{`${imageInfo?.Name}`}</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	btnContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center'
	},
	iconBtn: {
		flex: 5,
		padding: 6,
		height: 50,
		alignItems: 'center'
	}
});
