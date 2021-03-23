/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { KeyboardAvoidingView, Platform, StyleSheet, View, Image, Text } from 'react-native';
import { Input, Button, CheckBox } from 'react-native-elements';
import { useForm, FormProvider } from 'react-hook-form';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import { BASE_URL, Copyright_Text } from '../constants/Globals';
import CheckBoxStyle from '../styles/component/CheckboxStyle';

import ThemeColor from '../constants/ThemeColor';
import { FormInputField } from '../components/FormInputField';

/*BEGIN - Login Screen*/
const LoginScreen = ({ navigation }) => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [rememberMe, setRememberMe] = React.useState(false);
	const [iconLoading, setIconLoading] = React.useState(false);
	const [localErrors, setLocalErrors] = React.useState([]);

	const { login } = {};

	const formMethods = useForm();
	const { handleSubmit } = formMethods;

	const onSubmit = (form) => {
		console.log('onSubmit', form);
		AttemptLoggingIn();
	};

	const onErrors = (errors) => {
		//console.log('onErrors', errors);
		//setLocalErrors[errors];
	};

	/*BEGIN - React hook */
	React.useEffect(() => {
		return () => {
			setIconLoading(false);
		};
	}, [iconLoading]);
	/*END - React hook */

	return (
		<View style={{ flex: 1 }}>
			<View style={loginStyle.loginContainer}>
				<Image
					source={require('../assets/img/witly_login_logo.png')}
					resizeMode="center"
					width="100%"
				/>
				<View
					style={{
						width: '100%',
						paddingHorizontal: 40
					}}>
					<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
						<FormProvider {...formMethods}>
							<FormInputField
								name="username"
								iconName="account-circle"
								placeholder="Username"
								rules={{ required: 'Username is required!' }}
								defaultValue={'sujinda'}
							/>
							<FormInputField
								name="password"
								iconName="lock"
								placeholder="Password"
								isSecure={true}
								defaultValue={'P@ssw12rd'}
								rules={{
									required: 'Password is required!',
									minLength: {
										message: 'Use at least 6 characters.',
										value: 6
									}
								}}
							/>
						</FormProvider>
					</KeyboardAvoidingView>
					<View style={{}}>
						<Button
							type="solid"
							title="Login"
							loading={iconLoading}
							loadingProps={{ animating: true }}
							titleStyle={btnStyle.title}
							buttonStyle={btnStyle.button}
							containerStyle={btnStyle.container}
							onPress={handleSubmit(onSubmit, onErrors)}
						/>
						<CheckBox
							title="Remember me"
							checkedColor={ThemeColor.PRIMARY}
							size={30}
							checked={rememberMe}
							onPress={() => setRememberMe(!rememberMe)}
							containerStyle={CheckBoxStyle.container}
							textStyle={CheckBoxStyle.text}
						/>
						<Button
							type="outline"
							title="Forgot your password?"
							titleStyle={{}}
							buttonStyle={{
								height: 30
							}}
							containerStyle={{}}
						/>
					</View>
				</View>
			</View>
			<Text style={copyright.copyrightLabel}>{Copyright_Text}</Text>
		</View>
	);

	/*BEGIN - Functions*/
	async function AttemptLoggingIn() {
		setIconLoading(true);
		try {
			let query = new URLSearchParams({
				user: username === '' ? 'sujinda' : username,
				pwd: password === '' ? 'P@ssw0rd' : password
			});
			const url = BASE_URL + 'login?' + query.toString();

			await RestClient()
				.get('/login?' + query.toString())
				.then(function (response) {
					// handle success
					login(response.data);
				})
				.catch(function (error) {
					// handle error
					console.log('Exception axios.get', error, 'url', url);
				})
				.then(function () {
					// always executed
				});
		} catch (e) {
			console.log(e);
		}
	}
	/*END - Functions*/
};

/*END - Login Screen*/

/*BEGIN - Style*/

const loginStyle = StyleSheet.create({
	loginContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF'
	}
});

const btnStyle = StyleSheet.create({
	container: {
		borderRadius: 5,
		backgroundColor: ThemeColor.PRIMARY
	},
	button: {
		height: 50
	},
	title: {
		fontSize: 16
	}
});

const copyright = StyleSheet.create({
	copyrightLabel: {
		color: ThemeColor.TEXT,
		fontSize: 12,
		textAlign: 'center',
		backgroundColor: '#fff',
		paddingBottom: 10
	}
});
/*END - Style*/

export default LoginScreen;
