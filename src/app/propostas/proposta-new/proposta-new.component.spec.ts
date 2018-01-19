import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaNewComponent } from './proposta-new.component';

describe('PropostaNewComponent', () => {
  let component: PropostaNewComponent;
  let fixture: ComponentFixture<PropostaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropostaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
