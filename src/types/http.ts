
export interface GenericHttpResponse<T> {
    status: number;
    body: {
        error?: string | null;
        data?: T;
    };
}