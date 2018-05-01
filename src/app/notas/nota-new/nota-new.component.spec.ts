import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaNewComponent } from './nota-new.component';

describe('NotaNewComponent', () => {
  let component: NotaNewComponent;
  let fixture: ComponentFixture<NotaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
