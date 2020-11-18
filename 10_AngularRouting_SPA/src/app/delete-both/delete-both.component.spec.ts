import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBothComponent } from './delete-both.component';

describe('DeleteBothComponent', () => {
  let component: DeleteBothComponent;
  let fixture: ComponentFixture<DeleteBothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBothComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
