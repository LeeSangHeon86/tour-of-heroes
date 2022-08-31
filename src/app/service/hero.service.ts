import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HEROES } from '../mock';
import { Hero } from '../model/data';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService : fetched heroes(데이터를 불러옴)');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // TS컴파일러한테 HEROES.find(h => h.id === id)의 결과 값이
    // null이나 undefined가 나올리 없으니까 에러 내지말고 그냥 넘어가달라는 의미입니다
    const hero = HEROES.find((item) => item.id === id)!;
    this.messageService.add(`HeroService : fetched hero id=${id}`);
    return of(hero);
  }
}
