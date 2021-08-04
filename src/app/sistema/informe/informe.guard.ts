import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class InformeGuard implements CanActivate {
  
  constructor(private loginService : LoginService, private router : Router) { }

  canActivate() {
    if (this.loginService.loggedIn() && localStorage.getItem('rol') == "Admin" ) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
  
}
