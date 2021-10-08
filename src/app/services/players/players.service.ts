import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getPlayers(perPage=25, page=1):Observable<any> {

    const httpOptions = {
      params: {
        per_page: perPage,
        page: page
      },
      headers: new HttpHeaders({
        "x-rapidapi-key": "665ed21c81msh061a123159a7203p1bb178jsn2ddffd2c7093"
      })
    };

    return this.httpClient.get('https://free-nba.p.rapidapi.com/players', httpOptions);

  }
}
