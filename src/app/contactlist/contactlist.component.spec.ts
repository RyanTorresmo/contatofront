import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactlistComponent } from './contactlist.component';



describe('ContactlistComponent', () => {
  let component: ContactlistComponent;
  let fixture: ComponentFixture<ContactlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
