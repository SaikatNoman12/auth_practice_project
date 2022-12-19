export interface AddEmployee {
    userId?: string;
    name: string;
    designation: string;
    department: string;
    status: string;
}


export interface SetUserProfile {
    name:string,
    photoUrl:string
}