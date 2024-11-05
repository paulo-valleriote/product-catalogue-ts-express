export interface IAuthTokenHandler {
	sign(payload: ITokenPayload): string
	verify(token: string): ITokenVerifyResult
}

export interface ITokenPayload {
	userId: string
}

export interface ITokenVerifyResult {
	payload?: ITokenPayload
	error: boolean
}
