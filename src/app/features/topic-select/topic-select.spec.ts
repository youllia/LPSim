import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSelect } from './topic-select';

describe('TopicSelect', () => {
  let component: TopicSelect;
  let fixture: ComponentFixture<TopicSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
