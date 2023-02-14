export interface BaseResponseType<T> {
    data: T;
    message: String;
    status: String;
    statusCode: number;
    timeStamp: String;
}