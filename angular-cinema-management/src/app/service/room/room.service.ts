import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Room } from "src/app/model/room";
import { TokenStorageService } from "../token/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  private API_URL = "http://localhost:8080/api";
  httpOptions: any;
  constructor(
    private httpClient: HttpClient,
    private token: TokenStorageService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token.getUser().token}`,
        "Access-Control-Allow-Origin": "http://localhost:4200",
        "Access-Control-Allow-Methods":
          "GET, PUT, POST, DELETE, PATCH, OPTIONS",
      }),
    };
  }
  room: Room;
  getRoomByShowTime(idShowTime: number): Observable<any> {
    return this.httpClient.get<any>(
      this.API_URL + "/user/room/check-room/" + idShowTime,
      this.httpOptions
    );
  }
}
