export class ApiKey {
    public readonly name: string
    public readonly apiKey: string
    constructor(name: string, apiKey: string) {
        this.name = name
        this.apiKey = apiKey
    }
}