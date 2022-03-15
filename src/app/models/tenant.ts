export interface Tenant {
    id: string;
    key: string;
    isActive: boolean;
}


export interface CreateTenantRequest {
    key: string;
    adminEmail: string;
    password: string;
}

export interface UpdateTenantRequest {
    isActive: boolean;
}



// export interface RegisterTenantFormValues {
//     id: string;
//     name: string;
//     key: string;
//     adminEmail: string;
//     connectionString: string;
// }