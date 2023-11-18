class HTTPException extends Error {
  status;
  statusText;
  body;
  constructor(status, statusText, body) {
    super();
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
  get message() {
    return `(EXCEPTION) ${this.statusText} - ${this.body}`;
  }
}
class HTTPService {
  url;
  constructor(url, prefix) {
    if (prefix == null)
      prefix = "";
    this.url = new URL(prefix, url);
  }
  get request() {
    return new RequestParameters(this.url);
  }
}
class RequestParameters {
  base;
  query;
  init;
  headers;
  constructor(base, query) {
    this.base = base;
    this.query = query;
  }
  withQuery(path, query) {
    const newPath = [this.base.pathname, path].map((pathPart) => pathPart.replace(/(^\/|\/$)/g, "")).join("/");
    const newURL = new URL(newPath, this.base);
    for (const key in query) {
      newURL.searchParams.append(key, query[key]);
    }
    return newURL;
  }
  parseInit(method) {
    if (method == null && this.headers == null)
      return;
    let tempInit = Object.assign({}, this.init);
    if (tempInit == null) {
      tempInit = {};
    }
    if (method != null && tempInit != null)
      tempInit.method = method;
    if (this.headers != null && tempInit != null) {
      tempInit.headers = Object.assign({}, this.headers);
    }
    return tempInit;
  }
  withBody(body) {
    if (this.init == null) {
      this.init = {};
    }
    this.init.body = body;
    return this;
  }
  includeCredentials() {
    if (this.init == null) {
      this.init = {};
    }
    this.init.credentials = "include";
    return this;
  }
  includeSameOriginCredentials() {
    if (this.init == null) {
      this.init = {};
    }
    this.init.credentials = "same-origin";
    return this;
  }
  keepAlive() {
    if (this.init == null) {
      this.init = {};
    }
    this.init.keepalive = true;
    return this;
  }
  followRedirect() {
    if (this.init == null) {
      this.init = {};
    }
    this.init.redirect = "follow";
    return this;
  }
  errorOnRedirect() {
    if (this.init == null) {
      this.init = {};
    }
    this.init.redirect = "error";
    return this;
  }
  setHeader(key, value) {
    if (this.headers == null) {
      this.headers = {
        key: value
      };
    }
    this.headers[key] = value;
    return this;
  }
  setBearerToken(token) {
    this.setHeader("Authorization", `Bearer ${token}`);
    return this;
  }
  withAccessToken() {
    const tkn = localStorage.getItem("auth-tkn");
    this.setHeader("Authorization", `Bearer ${tkn}`);
    return this;
  }
  withAuthID() {
    const id = localStorage.getItem("auth-id");
    this.setHeader("Authorization", `${id}`);
    return this;
  }
  withContentType(mime) {
    this.setHeader("Content-Type", mime);
    return this;
  }
  withJSON(body) {
    const bd = JSON.stringify(body);
    return this.withBody(bd).withContentType("application/json");
  }
  async get(path, query) {
    const response = await fetch(this.withQuery(path, query), this.parseInit());
    if (!response.ok) {
      throw new HTTPException(response.status, response.statusText, await response.text());
    }
    return response.json();
  }
  async post(path, query) {
    const response = await fetch(this.withQuery(path, query), this.parseInit("POST"));
    if (!response.ok) {
      throw new HTTPException(response.status, response.statusText, await response.text());
    }
    return response.json();
  }
  async put(path, query) {
    const response = await fetch(this.withQuery(path, query), this.parseInit("PUT"));
    if (!response.ok) {
      throw new HTTPException(response.status, response.statusText, await response.text());
    }
    return response.json();
  }
  async delete(path, query) {
    const response = await fetch(this.withQuery(path, query), this.parseInit("DELETE"));
    if (!response.ok) {
      throw new HTTPException(response.status, response.statusText, await response.text());
    }
    return response.json();
  }
  async patch(path, query) {
    const response = await fetch(this.withQuery(path, query), this.parseInit("PATCH"));
    if (!response.ok) {
      throw new HTTPException(response.status, response.statusText, await response.text());
    }
    return response.json();
  }
}
const PUBLIC_API_URL = "http://localhost:5000";
class APIService {
  static httpService = new HTTPService(PUBLIC_API_URL, "api");
  static async createTournament(user_id, tournamentName, sport, type, startDate, endDate, lastRegisterDate, regulations, categories, location, address, noOfCourts) {
    try {
      const res = await this.httpService.request.withJSON({
        uid: user_id,
        name: tournamentName,
        sport,
        type,
        last_register_dt: startDate,
        start_dt: endDate,
        end_dt: lastRegisterDate,
        regulations,
        categories,
        location,
        address,
        courts: noOfCourts
      }).post("/tournament/create");
      return res.id;
    } catch (e) {
      throw e;
    }
  }
  static async getTournaments() {
    try {
      const response = await this.httpService.request.get("/tournaments");
      return response.tournaments;
    } catch (e) {
      throw e;
    }
  }
  static async getTournament(tournamentID) {
    try {
      const response = await this.httpService.request.get("/tournament/" + tournamentID);
      return response.tournaments;
    } catch (e) {
      throw e;
    }
  }
  static async registerUser(email, password, confirmationPassword, firstName, lastName, gender, dateOfBirth) {
    try {
      const res = await this.httpService.request.withJSON({
        email,
        password,
        confirmationPassword,
        firstName,
        lastName,
        gender,
        dateOfBirth
      }).post("/user/create");
      return res.code;
    } catch (e) {
      throw e;
    }
  }
  static async login(email, password) {
    try {
      const res = await this.httpService.request.withJSON({
        email,
        password
      }).post("/user/login");
      return res.code;
    } catch (e) {
      throw e;
    }
  }
}
