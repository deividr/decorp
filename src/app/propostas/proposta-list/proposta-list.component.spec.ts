import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaListComponent } from './proposta-list.component';

describe('PropostasComponent', () => {
  let component: PropostaListComponent;
  let fixture: ComponentFixture<PropostaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
