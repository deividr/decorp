import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment-timezone';

@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.css']
})
export class TestesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Executou os testes');
    const a = '2018-03-01';

    console.log(+a.substr(0, 4));
    console.log(+a.substr(5, 2));
    console.log(+a.substr(8, 2));

  const data = new Date(
      +a.substr(0, 4),
      +a.substr(5, 2) - 1,
      +a.substr(8, 2)
    );

    console.log(data.toISOString().substr(0, 10));
  }

}
