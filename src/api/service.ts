

import axios from 'axios';

export const getData = async (): Promise<GetDataResponse> => {
    try {
        const response = await axios.get<GetDataResponse>('angular_react_Response.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching list:', error);
        throw error;
    }
};


export const updateName = async (payload: IPayload): Promise<GetDataResponse> => {
    try {
        const response = await axios.put<GetDataResponse>('angular_react_Response.json', payload);
        return response.data;
    } catch (error) {
        console.error('Error updating list:', error);
        throw error;
    }
};


export interface IPayload {
    Title: string;
    imdbID: string;
}


export interface IResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface GetDataResponse {
    results: IResult[];
    totalResults: string

}
