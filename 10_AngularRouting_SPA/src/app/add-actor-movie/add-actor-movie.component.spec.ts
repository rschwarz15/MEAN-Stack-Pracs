import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActorMovieComponent } from './add-actor-movie.component';

describe('AddActorMovieComponent', () => {
  let component: AddActorMovieComponent;
  let fixture: ComponentFixture<AddActorMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActorMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActorMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
