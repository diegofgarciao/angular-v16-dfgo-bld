import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for valid credentials', () => {
    const result = service.login('user', 'password');
    expect(result).toBeTrue();
  });

  it('should return false for invalid credentials', () => {
    const result = service.login('invalidUser', 'invalidPassword');
    expect(result).toBeFalse();
  });

  it('should set isAuthenticated to true on successful login', () => {
    service.login('user', 'password');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should set isAuthenticated to false on logout', () => {
    service.login('user', 'password');
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
  });

});
