class Admin {
    constructor(adminData) {
        this.id = adminData.id;
        this.first_name = adminData.first_name;
        this.last_name = adminData.last_name;
        this.email = adminData.email;
        this.password_hash = adminData.password_hash;
        this.created_at = adminData.created_at;
        this.updated_at = adminData.updated_at;
    }

    // Get full name
    get fullName() {
        return `${this.first_name} ${this.last_name}`;
    }


    // Convert to JSON (excluding sensitive data)
    toJSON() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            created_at: this.created_at,
            updated_at: this.updated_at,
            full_name: this.fullName
        };
    }

    // Create Admin instance from database data
    static fromDatabaseData(data) {
        return new Admin(data);
    }
}

export default Admin; 