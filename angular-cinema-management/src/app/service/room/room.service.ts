import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from 'src/app/model/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private API_URL = "http://localhost:8080/api/public/room/check-room/"

  constructor(private httpClient: HttpClient) {

  }
  room: Room;
  getRoomByShowTime(idShowTime: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + idShowTime);
  }
}
