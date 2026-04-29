import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLibroComponent } from './details-libro.component';

describe('DetailsLibroComponent', () => {
  let component: DetailsLibroComponent;
  let fixture: ComponentFixture<DetailsLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsLibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
