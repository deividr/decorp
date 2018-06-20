import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-testes',
  templateUrl: './testes.component.html',
  styleUrls: ['./testes.component.css']
})
export class TestesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const myArray = [0];
    const myString = myArray.join(',');
    console.log(myString);
    console.log(myString.split(',').map(v => parseInt(v, 0)));
    /*
    const age$ = Observable.of<number>(27, 25, 29);
    const name$ = Observable.of<string>('Foo', 'Bar', 'Beer');
    const isDev$ = Observable.of<boolean>(true, true, false);

    Observable
      .zip(age$,
        name$,
        isDev$,
        (age: number, name: string, isDev: boolean) => ({ age, name, isDev }))
      .subscribe(x => console.log(x));
      */
  }

}
