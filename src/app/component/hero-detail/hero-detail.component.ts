import { Component, Input, OnInit } from '@angular/core';
import { HSModel } from 'src/app/model';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: HSModel.Hero;

  constructor() {}

  ngOnInit(): void {}
}
