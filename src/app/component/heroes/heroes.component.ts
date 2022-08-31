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

  // onSelect(hero: HSModel.Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(
  //     `HeroesComponent : Selected hero id=${hero.id}, name=${hero.name}`
  //   );
  // }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
