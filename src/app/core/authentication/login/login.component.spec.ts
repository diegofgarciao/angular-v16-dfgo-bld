import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show error message initially', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error')).toBeNull();
  });

  it('should navigate to dashboard on successful login', () => {
    spyOn(authService, 'login').and.returnValue(true);
    spyOn(router, 'navigate');
    component.username = 'user';
    component.password = 'password';
    component.onLogin();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show error message on failed login', () => {
    spyOn(authService, 'login').and.returnValue(false);
    component.username = 'invalidUser';
    component.password = 'invalidPassword';
    component.onLogin();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error').textContent).toContain('Usuario o contraseña inválidos.');
  });
});
