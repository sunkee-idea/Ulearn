import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './guard/auth.service';
import { map,catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { IUser } from '../models/IUser';
import { SystemConstant as Roles, routes } from '../../shared/constant';
import { ErrorHandler } from '../common/ErrorHandler';
import { IThesis, IPaginationModel } from '../models/IThesis';

@Injectable()
export class ServerService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  signupApplicant(user: IUser): Observable<IUser> {
    const header = this.requestHeader({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    return this.http.post<IUser>(routes.REGISTER, user, { headers: header }).pipe(map(user => {
        return user;
      }),
      catchError(ErrorHandler.handleError));
  }

  submitThesis(thesis: FormData): Observable<any> {
    return this.http.post<IThesis>(routes.SUBMITTHESIS, thesis).pipe(map(thesis => {
        return thesis;
      }),
      catchError(ErrorHandler.ErrorServerConnection));
  }

  getAllThesis(filtered:string,page:number,pageSize:number=4): Observable<IPaginationModel> {
    
//    let param = new HttpParams().set('filter', filtered).set('page', page).set('pageSize', pageSize);
//    {params:param}
   
    return this.http.get<IPaginationModel>(routes.GETALLTHESIS+"?filter="+filtered+"&page="+page+"&pageSize="+pageSize).pipe(map(theses => {
        return theses;
      }),
      catchError(ErrorHandler.ErrorServerConnection));
  }

  approveThesis(data:IThesis): Observable<IThesis> {
    return this.http.put<IThesis>(routes.APPROVE, data).pipe(map(thesis => {
        return thesis;
      }),
      catchError(ErrorHandler.ErrorServerConnection));
  }

  getThesis(id: string): Observable<IThesis[]> {
    //let param = new HttpParams().set('page', page); ;
    return this.http.get<IThesis[]>(routes.GETTHESIS + id).pipe(map(thesis => {
        return thesis;
      }),
      catchError(ErrorHandler.ErrorServerConnection));
  }
  getCountry():Observable<any>{
    let apiUrl = "../../../assets/countries-data.json";
    return this.http.get(apiUrl).pipe(map(res =>{
      return res;
    }),catchError(ErrorHandler.ErrorServerConnection))
  }

  private requestHeader(contentType: any): any {
    return new HttpHeaders(contentType);

  }

}
