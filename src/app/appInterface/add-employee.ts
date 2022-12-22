export interface AddEmployee {
    userId?: string;
    name: string;
    designation: string;
    department: string;
    status: string;
}


export interface SetUserProfile {
    userToken?: string;
    name: string;
    photoUrl: string;
}