class Appointment {
    constructor(appointmentData) {
        this.id = appointmentData.id;
        this.client_id = appointmentData.client_id;
        this.time = appointmentData.time;
        this.created_at = appointmentData.created_at;
        this.updated_at = appointmentData.updated_at;

        // Include client data if available
        if (appointmentData.client) {
            this.client = appointmentData.client;
        }
    }

    // Convert to JSON
    toJSON() {
        const json = {
            id: this.id,
            client_id: this.client_id,
            time: this.time,
            created_at: this.created_at,
            updated_at: this.updated_at
        };

        // Include client data if available
        if (this.client) {
            json.client = this.client;
        }

        return json;
    }

    // Create Appointment instance from database data
    static fromDatabaseData(data) {
        return new Appointment(data);
    }
}

export default Appointment; 