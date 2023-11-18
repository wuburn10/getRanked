<script lang="ts">
	import { APIService } from '$lib/services/api.service';
	import { Stepper, Step, getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let email = '',
		password = '',
		confirmationPassword = '',
		firstName = '',
		lastName = '',
		gender = '',
		dateOfBirth = '';

	async function registerUser() {
		console.log('Register User');
		if (
			email == '' ||
			password == '' ||
			confirmationPassword == '' ||
			firstName == '' ||
			lastName == '' ||
			gender == '' ||
			dateOfBirth == ''
		) {
			toastStore.trigger({
				message: 'Make sure that all fields are filled',
				background: 'variant-filled-error'
			});
		} else if (password != confirmationPassword) {
			toastStore.trigger({
				message: 'Password does not match with Confirmation Password',
				background: 'variant-filled-error'
			});
		} else {
			let response = await APIService.registerUser(
				email,
				password,
				confirmationPassword,
				firstName,
				lastName,
				gender,
				dateOfBirth
			);
			console.log(response);
			if (response == '-1') {
				toastStore.trigger({
					message: 'There was an error creating a new user. Try Again',
					background: 'variant-filled-error'
				});
			} else if (response == '0') {
				toastStore.trigger({
					message: 'Account Successfully Created!',
					background: 'variant-filled-success'
				});
			}
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<div class="w-full card p-6 text-token m-3">
			<Stepper on:complete={registerUser}>
				<Step>
					<svelte:fragment slot="header">Account Details</svelte:fragment>
					<input bind:value={email} required class="input" type="email" placeholder="Email" />
					<input
						bind:value={password}
						required
						class="input"
						type="password"
						placeholder="Password"
					/>
					<input
						bind:value={confirmationPassword}
						required
						class="input"
						type="password"
						placeholder="Confirmation Password"
					/>
				</Step>
				<Step>
					<svelte:fragment slot="header">User Information</svelte:fragment>
					<label class="label">
						<span>First Name</span>
						<input bind:value={firstName} class="input" type="text" placeholder="First Name" />
					</label>
					<label class="label">
						<span>Last Name</span>
						<input bind:value={lastName} class="input" type="text" placeholder="Last Name" />
					</label>
					<label class="label">
						<span>Gender</span>
						<select bind:value={gender} class="select">
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</label>
					<label class="label">
						<span>Date of Birth</span>
						<input bind:value={dateOfBirth} class="input" title="Input (date)" type="date" />
					</label>
				</Step>
			</Stepper>
		</div>
	</div>
</div>

<style>
</style>
