import { FormDataType } from "@/app/types";


export function useGenerateReferenceKey(data: FormDataType) {    
    return (new Date()).getDate().toLocaleString() + (new Date()).getMilliseconds().toLocaleString() + "-" + (data.first_name.substring(0,3)).toLocaleLowerCase() + (data.last_name.substring(0,3)).toLocaleLowerCase() + "-" + (new Date()).getMilliseconds().toLocaleString()
}
