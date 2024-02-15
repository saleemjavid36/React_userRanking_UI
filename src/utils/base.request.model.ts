import { Observable } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { Method, _Headers,Body } from "./type";


export default class BaseRequestModel{
    constructor(private url:string,private method:Method,private headers:_Headers,private body? :Body){}

    request():Observable<any>{
        return new Observable((observer)=>{
            fromFetch(this.url,{
                method: this.method,
                headers: this.headers,
                body: this.body,
                selector: (resp: Response) => resp.json(),
            }).subscribe({
                next:(data:any)=>{
                    observer.next(data);
                    observer.complete();
                },
                error: (err) => {
                    observer.error(err);
                    observer.complete();
                },
            })
            return()=>{
                observer.complete();
            }
        })
    }
}