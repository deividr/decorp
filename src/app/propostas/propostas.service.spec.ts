import { TestBed, inject } from '@angular/core/testing';

import { PropostasService } from './propostas.service';

describe('PropostaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropostasService]
    });
  });

  it('should be created', inject([PropostasService], (service: PropostasService) => {
    expect(service).toBeTruthy();
  }));
});
