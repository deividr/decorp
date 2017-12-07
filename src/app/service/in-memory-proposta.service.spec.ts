import { TestBed, inject } from '@angular/core/testing';

import { InMemoryPropostaService } from './in-memory-proposta.service';

describe('InMemoryPropostaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryPropostaService]
    });
  });

  it('should be created', inject([InMemoryPropostaService], (service: InMemoryPropostaService) => {
    expect(service).toBeTruthy();
  }));
});
