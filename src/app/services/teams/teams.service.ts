import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/interfaces/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getTeam(id: number): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        "x-rapidapi-key": "665ed21c81msh061a123159a7203p1bb178jsn2ddffd2c7093"
      })
    };

    return this.httpClient.get(`https://free-nba.p.rapidapi.com/teams/${id}`, httpOptions);

  }
}
