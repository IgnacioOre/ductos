import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInsumoComponent } from './edit-insumo.component';

describe('EditInsumoComponent', () => {
  let component: EditInsumoComponent;
  let fixture: ComponentFixture<EditInsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInsumoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
