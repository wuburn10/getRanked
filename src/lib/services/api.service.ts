import { HTTPService } from './http.service';

const PUBLIC_API_URL = 'http://localhost:5000';

export abstract class APIService {
	private static httpService = new HTTPService(PUBLIC_API_URL, 'api');

	public static async createTournament(
		user_id: string,
		tournamentName: string,
		sport: string,
		type: string,
		startDate: string,
		endDate: string,
		lastRegisterDate: string,
		regulations: string,
		categories: string,
		location: string,
		address: string,
		noOfCourts: number
	): Promise<string> {
		try {
			const res: any = await this.httpService.request
				.withJSON({
					uid: user_id,
					name: tournamentName,
					sport: sport,
					type: type,
					last_register_dt: startDate,
					start_dt: endDate,
					end_dt: lastRegisterDate,
					regulations: regulations,
					categories: categories,
					location: location,
					address: address,
					courts: noOfCourts
				})
				.post('/tournament/create');
			return res.id;
		} catch (e) {
			throw e;
		}
	}

	public static async getTournaments(): Promise<any> {
		try {
			const response: any = await this.httpService.request.get('/tournaments');
			return response.tournaments;
		} catch (e) {
			throw e;
		}
	}

	public static async getTournament(tournamentID: string): Promise<any> {
		try {
			const response: any = await this.httpService.request.get('/tournament/' + tournamentID);
			return response;
		} catch (e) {
			throw e;
		}
	}

	public static async getTournamentPlayers(tournamentID: string): Promise<any> {
		try {
			const response: any = await this.httpService.request.get(
				'/tournament/players/' + tournamentID
			);
			return response.tournament;
		} catch (e) {
			throw e;
		}
	}

	public static async joinTournament(tournamentID: string, categoryID: string): Promise<any> {
		try {
			const response: any = await this.httpService.request
				.withJSON({
					tournamentID: tournamentID,
					categoryID: categoryID
				})
				.withAuthID()
				.post('/tournament/join');
			return response;
		} catch (e) {
			throw e;
		}
	}

	public static async registerUser(
		email: string,
		password: string,
		confirmationPassword: string,
		firstName: string,
		lastName: string,
		gender: string,
		dateOfBirth: string
	): Promise<string> {
		try {
			const res: any = await this.httpService.request
				.withJSON({
					email: email,
					password: password,
					confirmationPassword: confirmationPassword,
					firstName: firstName,
					lastName: lastName,
					gender: gender,
					dateOfBirth: dateOfBirth
				})
				.post('/user/create');
			return res.code;
		} catch (e) {
			throw e;
		}
	}

	public static async login(email: string, password: string): Promise<string> {
		try {
			const res: any = await this.httpService.request
				.withJSON({
					email: email,
					password: password
				})
				.post('/user/login');
			return res.code;
		} catch (e) {
			throw e;
		}
	}
}
