export class ApiKey {
    private readonly name: string
    private readonly apiKey: string
    constructor(name: string, apiKey: string) {
        this.name = name
        this.apiKey = apiKey
    }
}