import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent]
    });

    component = TestBed.createComponent(NavbarComponent).componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login on logout', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.logout();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

});
