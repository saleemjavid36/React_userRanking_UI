import { Observable, retry } from "rxjs";
import BaseRequestModel from "../utils/base.request.model";
import { Body } from "../utils/type";

export const ApiService={
    get:(route:string):Observable<any>=>{
        const headers= {
            "Content-type":"application/json"
        }
        const newBase = new BaseRequestModel(route,"GET",headers);
        return newBase.request();
    },
    put:(route:string,form:Body):Observable<any>=>{
        const headers={
            "Content-Type":"application/json"
        }
        const newBase = new BaseRequestModel(route,"PUT",headers,form);
        return newBase.request();
    }
}