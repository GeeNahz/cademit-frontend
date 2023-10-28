import { FormDataType } from "@/app/types";
import bcrypt from "bcrypt";


export function useGenerateReferenceKey(data: FormDataType) {    
    return (new Date()).getDate().toLocaleString() + (new Date()).getMilliseconds().toLocaleString() + "-" + (data.first_name.substring(0,3)).toLocaleLowerCase() + (data.last_name.substring(0,3)).toLocaleLowerCase() + "-" + (new Date()).getMilliseconds().toLocaleString()
}

export function useHashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
}

export function useCheckHashPassword(password: string, hashed_password: string) {
    return bcrypt.compareSync(password, hashed_password);
}
