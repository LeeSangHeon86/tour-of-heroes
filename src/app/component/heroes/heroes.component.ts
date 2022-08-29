import { Component, OnInit } from '@angular/core';
import { HSModel } from 'src/app/model';
import * as Mock from '../../mock';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  heroes: HSModel.Hero[] = Mock.HEROES;
  selectedHero?: HSModel.Hero;

  constructor() {}

  ngOnInit(): void {}

  onSelect(hero: HSModel.Hero): void {
    this.selectedHero = hero;
  }
}
