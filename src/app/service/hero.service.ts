import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HEROES } from '../mock';
import { Hero } from '../model/data';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient
  ) {}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * 히어로 데이터 목록 가져오기
   * @returns
   */
  // client : mock에서 heroes 데이터 가져오기
  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.messageService.add('HeroService : fetched heroes(데이터를 불러옴)');
  //   return heroes;
  // }

  // server : 서버에서 heroes 데이터 가져오기
  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /** client :  mock에서 id 값을 가지고 hero 데이터 가져오기 */
  // getHero(id: number): Observable<Hero> {
  //   // TS컴파일러한테 HEROES.find(h => h.id === id)의 결과 값이
  //   // null이나 undefined가 나올리 없으니까 에러 내지말고 그냥 넘어가달라는 의미입니다
  //   const hero = HEROES.find((item) => item.id === id)!;
  //   this.messageService.add(`HeroService : fetched hero id=${id}`);
  //   return of(hero);
  // }

  /**
   * 히어로 데이터 Id로 검색하여 가져오기
   * server : GET: id에 해당하는 히어로 데이터 가져오기. 존재하지 않으면 404를 반환합니다.
   * @param id
   * @returns
   */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
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
    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
