import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamConfig } from './exam-config';

describe('ExamConfig', () => {
  let component: ExamConfig;
  let fixture: ComponentFixture<ExamConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
