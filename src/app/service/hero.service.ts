import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../model/data';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { HSModel } from '../model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * 히어로 데이터 목록 가져오기
   * @returns
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /**
   * 히어로 데이터 Id로 검색하여 가져오기
   * server : GET: id에 해당하는 히어로 데이터 가져오기. 존재하지 않으면 404를 반환합니다.
   * @param id
   * @returns
   */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id= ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /**
   * HTTP 요청이 실패한 경우를 처리합니다.
   * 애플리케이션 로직 흐름은 그대로 유지됩니다.
   * @param operation
   * @param result
   * @returns
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO : 리모트 서버로 에러 메시지 보내기
      console.error(error);

      // TODO : 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);

      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }

  /**
   * 히어로 데이터 수정하기
   * @param hero
   * @returns
   */

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * 히어로 데이터 추가하기
   * @param hero
   * @returns
   */
  addHero(hero: HSModel.Hero): Observable<HSModel.Hero> {
    return this.http
      .post<HSModel.Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: HSModel.Hero) =>
          this.log(`added hero w/ id=${newHero.id}`)
        ),
        catchError(this.handleError<HSModel.Hero>(`addHero`))
      );
  }

  /**
   * 히어로 데이터 삭제하기
   * @param id
   * @returns
   */
  deleteHero(id: number): Observable<HSModel.Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<HSModel.Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<HSModel.Hero[]> {
    if (!term.trim()) {
      return of();
    }

    return this.http
      .get<HSModel.Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<HSModel.Hero[]>(`searchHeroes`, []))
      );
  }
}
