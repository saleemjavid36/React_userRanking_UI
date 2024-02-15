import { Observable, lastValueFrom } from "rxjs";
import { ApiService } from "../../services/api.service";
import { IUpdateRank } from "../../Interface/Update";


export const GetUserRankingService={
    GetUserRanking:():Observable<any>=>{
        return new Observable((observer)=>{
            ApiService.get(
                `${process.env.REACT_APP_RANKING}UserRanking`,
            ).subscribe({
                next(value){
                    observer.next(value);
                    observer.complete();
                },
                error(err) {
                    observer.error(err);
                    observer.complete();
                },
            })
        })
    },
    UpdateRank:async(data:IUpdateRank):Promise<any>=>{
        console.log(data);
        const newdata={
            id:0,
            name:data.name,
            ranking:data.ranking
        }
        const _body = JSON.stringify(newdata);
        return await lastValueFrom(ApiService.put(`${process.env.REACT_APP_RANKING}UserRanking/${data.id}`, _body))
    }
}