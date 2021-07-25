import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsumoComponent } from './add-insumo.component';

describe('AddInsumoComponent', () => {
  let component: AddInsumoComponent;
  let fixture: ComponentFixture<AddInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
