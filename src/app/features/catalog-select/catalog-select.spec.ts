import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSelect } from './catalog-select';

describe('CatalogSelect', () => {
  let component: CatalogSelect;
  let fixture: ComponentFixture<CatalogSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
