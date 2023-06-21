import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cdnjs } from '../Interfaces/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CndjsService {
  // Esta URL nos dara una lista de resultados
  private URL =
    'https://ofcncog2cu-dsn.algolia.net/1/indexes/npm-search/query?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%20(lite)&x-algolia-application-id=OFCNCOG2CU&x-algolia-api-key=f54e21fa3a2a0160595bb058179bfb1e';

  constructor(private http: HttpClient) {}

  getPackage(search: string | null, pageNumer: number) {
    if (!search) return;

    const result = this.http.post(this.URL, {
      params: `query=${search}&page=${pageNumer}&hitsPerPage=10&attributesToRetrieve=%5B%22deprecated%22%2C%22description%22%2C%22githubRepo%22%2C%22homepage%22%2C%22keywords%22%2C%22license%22%2C%22name%22%2C%22owner%22%2C%22version%22%2C%22popular%22%2C%22moduleTypes%22%2C%22styleTypes%22%2C%22jsDelivrHits%22%5D&analyticsTags=%5B%22jsdelivr%22%5D&facetFilters=moduleTypes%3Aesm`,
    });

    return result;
  }
}
