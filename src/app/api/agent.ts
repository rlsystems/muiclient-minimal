import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'material-react-toastify';
//import { history } from '../..';

import { store } from '../stores/store';
import { TokenData, User, UserLogin, RegisterUserFormValues } from '../models/user';
import { SearchParams } from '../models/searchParams';
import { PaginatedResult } from '../models/paginatedResult';
import { Result } from '../models/result';
import { CreateTenantRequest, Tenant } from '../models/tenant';
import { Property } from '../models/property';
import { Venue } from '../models/venue';


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:7250/api';

axios.interceptors.request.use(config => { //this will send up the token with every request, when there is a token
    const token = store.commonStore.token;
 
    config.headers = {
        Tenant: store.commonStore.tenant ?? '',
    };

    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    //await sleep(1000); //Artifical delay, for development
    return response;

}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if(typeof data === 'string'){
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')) {
                //history.push('/not-found');
            }
            if(data.errors){
                const modalStateErrors = [];
                for (const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
         
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            //history.push('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            //history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})


const responseBody = <T>(response: AxiosResponse<T>) => response.data;


const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}


//Identity
const Account = {
    current: () => requests.get<Result<User>>('/identity/profile'),
    login: (user: UserLogin) => requests.post<Result<TokenData>>(`/tokens`, user), 
    update: (user: User) => requests.put<void>(`/identity/profile`, user), //without id is for the current user
}

//user
const Users = {
    list: () => requests.get<Result<User[]>>('/identity/userlist'),
    create: (appUser: RegisterUserFormValues) => requests.post<Result<String>>(`/identity/register`, appUser),
    details: (id: string) => requests.get<Result<User>>(`/identity/profile/${id}`),
    update: (user: User) => requests.put<void>(`/identity/profile/${user.id}`, user), //with id is admin editing a user
}

//Tenants
const Tenants = {
    list: () => requests.get<Result<Tenant[]>>('/tenants'),
    details: (id: string) => requests.get<Result<Tenant>>(`/tenants/${id}`),
    create: (tenant: CreateTenantRequest) => requests.post<Result<Tenant>>(`/tenants`, tenant),

}



const Venues = {

    search: (params: SearchParams) => requests.post<PaginatedResult<Venue>>(`/venues/getallvenues`, params), //post 

    create: (venue: Venue) => requests.post<Result<String>>('/venues', venue),
    details: (id: string) => requests.get<Result<Venue>>(`/venues/${id}`),
    update: (venue: Venue) => requests.put<void>(`/venues/${venue.id}`, venue),
    delete: (id: string) => requests.del<void>(`/venues/${id}`), //or Result<string> is ok too
    


}

const agent = {
    Account, 
    Users,
    Tenants,
    Venues
}

export default agent;