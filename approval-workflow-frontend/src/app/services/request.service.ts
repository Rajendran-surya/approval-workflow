import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request, RequestType, Status } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://localhost:3000/api/requests';

  constructor(private http: HttpClient) { }

  private getHeaders(role: string = 'USER'): HttpHeaders {
    return new HttpHeaders().set('Role', role);
  }

  createRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(this.apiUrl, request);
  }

  getRequests(status?: Status, type?: RequestType): Observable<Request[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    if (type) params = params.set('type', type);
    return this.http.get<Request[]>(this.apiUrl, { params });
  }

  updateStatus(id: number, status: Status, role: string = 'USER'): Observable<Request> {
    const headers = this.getHeaders(role);
    return this.http.put<Request>(`${this.apiUrl}/${id}/status`, { status }, { headers });
  }
}