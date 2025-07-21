class Client {
    constructor(clientData) {
        this.id = clientData.id;
        this.name = clientData.name;
        this.email = clientData.email;
        this.phone = clientData.phone;
        this.created_at = clientData.created_at;
        this.updated_at = clientData.updated_at;
    }

    // Convert to JSON (excluding sensitive data)
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }

    // Create Client instance from database data
    static fromDatabaseData(data) {
        return new Client(data);
    }
}

export default Client; 