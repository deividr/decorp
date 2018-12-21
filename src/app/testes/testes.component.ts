import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.css']
})
export class TestesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const teste = {};
    console.log(isEmpty(teste));
  }

}
