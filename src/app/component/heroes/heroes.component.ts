import { Component, OnInit } from '@angular/core';
import { HSModel } from 'src/app/model';

import { HeroService } from 'src/app/service/hero.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: HSModel.Hero[] = [];
  // selectedHero?: HSModel.Hero;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {
    this.getHeroes();
  }

  ngOnInit(): void {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService
      .addHero({ name } as HSModel.Hero)
      .subscribe((hero) => this.heroes.push(hero));
  }

  delete(hero: HSModel.Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
