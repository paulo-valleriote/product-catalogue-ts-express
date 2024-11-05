export interface ICryptoHandler {
	encrypt(value: string): string
	validate(value: string, encryptedValue: string): boolean
}
