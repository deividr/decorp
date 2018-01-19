import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaEditComponent } from './proposta-edit.component';

describe('PropostaEditComponent', () => {
  let component: PropostaEditComponent;
  let fixture: ComponentFixture<PropostaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
