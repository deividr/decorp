import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaDetailComponent } from './proposta-detail.component';

describe('PropostaDetailComponent', () => {
  let component: PropostaDetailComponent;
  let fixture: ComponentFixture<PropostaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
