export interface DataModel {
    description: string;
    amount: number;
    category: string;
    status: string;
    due_date: string;
    urgency?: string;
    currency: string;
}