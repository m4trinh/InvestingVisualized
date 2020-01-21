import React, { useContext, useState } from 'react';
import { AuthContext } from './Authentication';
import Definition, { DefinitionModel } from './GenericComponents/Definition';

const SignUp = () => {
	const { signIn } = useContext(AuthContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const onSubmit = async ({ email, password }) => {
		// const { token, user } = await getTokenAndUserFromSomewhere(email, password)
		// signIn(user, token)
	};

	const validiateForm = (): boolean => {
		if (password !== confirmPassword) {
			return false;
		}
		/*
        if (!validEmail(email)){
            return false;
        }*/
		return true;
	};

	const renderSignUpForm = () => (
		<form>
			<div className="form-group">
				<label>Name</label>
				<input type="email" className="form-control" placeholder="Enter Username" />
			</div>
			<div className="form-group">
				<label>Email address</label>
				<input type="email" className="form-control" placeholder="Enter email" />
			</div>
			<div className="form-group">
				<label>Password</label>
				<input
					type="password"
					className="form-control"
					placeholder="Enter Password"
				/>
			</div>
			<div className="form-group">
				<label>Confirm Password</label>
				<input
					type="password"
					className="form-control"
					placeholder="Confirm Password"
				/>
			</div>
			<button type="submit" className="btn btn-primary">
				Sign Up
			</button>
		</form>
	);
	return <Definition title="Sign Up" body={renderSignUpForm()}></Definition>;
};

export default SignUp;
