export class HTTPException extends Error {
	public status: number;
	public statusText: string;
	public body: string;

	constructor(status: number, statusText: string, body: string) {
		super();
		this.status = status;
		this.statusText = statusText;
		this.body = body;
	}

	public get message(): string {
		return `(EXCEPTION) ${this.statusText} - ${this.body}`;
	}
}

export class HTTPService {
	private url: URL;

	constructor(url: string, prefix?: string) {
		if (prefix == null) prefix = '';
		this.url = new URL(prefix, url);
	}

	public get request(): RequestParameters {
		return new RequestParameters(this.url);
	}
}

class RequestParameters {
	private base: URL;
	public query?: Record<string, string>;
	public init?: RequestInit;
	public headers?: Record<string, string>;

	constructor(base: URL, query?: Record<string, string>) {
		this.base = base;
		this.query = query;
	}

	private withQuery(path: string, query?: Record<string, string>): URL {
		const newPath = [this.base.pathname, path]
			.map((pathPart) => pathPart.replace(/(^\/|\/$)/g, ''))
			.join('/');
		const newURL = new URL(newPath, this.base);

		for (const key in query) {
			newURL.searchParams.append(key, query[key]);
		}
		return newURL;
	}

	private parseInit(method?: string): RequestInit | undefined {
		if (method == null && this.headers == null) return;

		let tempInit = Object.assign({}, this.init);

		if (tempInit == null) {
			tempInit = {} as RequestInit;
		}

		if (method != null && tempInit != null) tempInit.method = method;

		if (this.headers != null && tempInit != null) {
			tempInit.headers = Object.assign({}, this.headers);
		}

		return tempInit;
	}

	public withBody(body: BodyInit): RequestParameters {
		if (this.init == null) {
			this.init = {} as RequestInit;
		}
		this.init.body = body;
		return this;
	}

	public includeCredentials(): RequestParameters {
		if (this.init == null) {
			this.init = {} as RequestInit;
		}
		this.init.credentials = 'include';
		return this;
	}

	public includeSameOriginCredentials(): RequestParameters {
		if (this.init == null) {
			this.init = {} as RequestInit;
		}
		this.init.credentials = 'same-origin';
		return this;
	}

	public keepAlive(): RequestParameters {
		if (this.init == null) {
			this.init = {} as RequestInit;
		}
		this.init.keepalive = true;
		return this;
	}

	public followRedirect(): RequestParameters {
		if (this.init == null) {
			this.init = {} as RequestInit;
		}
		this.init.redirect = 'follow';
		return this;
	}

	public errorOnRedirect(): RequestParameters {
		if (this.init == null) {
			this.init = {} as RequestInit;
		}
		this.init.redirect = 'error';
		return this;
	}

	public setHeader(key: string, value: string): RequestParameters {
		if (this.headers == null) {
			this.headers = {
				key: value
			};
		}
		this.headers[key] = value;
		return this;
	}

	public setBearerToken(token: string): RequestParameters {
		this.setHeader('Authorization', `Bearer ${token}`);
		return this;
	}

	public withAccessToken(): RequestParameters {
		const tkn = localStorage.getItem('auth-tkn');
		this.setHeader('Authorization', `Bearer ${tkn}`);
		return this;
	}

	public withAuthID(): RequestParameters {
		const id = localStorage.getItem('auth-id');
		this.setHeader('Authorization', `${id}`);
		return this;
	}

	public withContentType(mime: string): RequestParameters {
		this.setHeader('Content-Type', mime);
		return this;
	}

	public withJSON(body: Record<string, unknown>): RequestParameters {
		const bd = JSON.stringify(body);
		return this.withBody(bd).withContentType('application/json');
	}

	public async get<ReturnType>(path: string, query?: Record<string, string>): Promise<ReturnType> {
		const response = await fetch(this.withQuery(path, query), this.parseInit());

		if (!response.ok) {
			throw new HTTPException(response.status, response.statusText, await response.text());
		}
		return response.json() as ReturnType;
	}

	public async post<ReturnType>(path: string, query?: Record<string, string>): Promise<ReturnType> {
		const response = await fetch(this.withQuery(path, query), this.parseInit('POST'));

		if (!response.ok) {
			throw new HTTPException(response.status, response.statusText, await response.text());
		}
		return response.json() as ReturnType;
	}

	public async put<ReturnType>(path: string, query?: Record<string, string>): Promise<ReturnType> {
		const response = await fetch(this.withQuery(path, query), this.parseInit('PUT'));

		if (!response.ok) {
			throw new HTTPException(response.status, response.statusText, await response.text());
		}
		return response.json() as ReturnType;
	}

	public async delete<ReturnType>(
		path: string,
		query?: Record<string, string>
	): Promise<ReturnType> {
		const response = await fetch(this.withQuery(path, query), this.parseInit('DELETE'));

		if (!response.ok) {
			throw new HTTPException(response.status, response.statusText, await response.text());
		}
		return response.json() as ReturnType;
	}

	public async patch<ReturnType>(
		path: string,
		query?: Record<string, string>
	): Promise<ReturnType> {
		const response = await fetch(this.withQuery(path, query), this.parseInit('PATCH'));

		if (!response.ok) {
			throw new HTTPException(response.status, response.statusText, await response.text());
		}
		return response.json() as ReturnType;
	}
}
