import { Component } from '@angular/core';
import { UserServiceService } from '../shared/user-service.service';
import { Router } from '@angular/router';
import { UserModuleModule } from '../modules/user-module/user-module.module';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  userData: any;
  error: string | null = null;
  loading = false;
  setUserData: any;
  qName = '';
  qEmail = '';
  qCompany = '';
  qCity = '';
  qAddress = '';
  filtered: any;
  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.userService.getData().subscribe({
      next: (response) => {
        this.userData = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

  viewUser(user: User) {
    const setUserData = btoa(JSON.stringify(user));
    this.router.navigate(['/User_detail', user.id], {
      queryParams: { data: setUserData },
    });
  }
  applyFilters(key: string) {
    this.filtered.sort((a: { company: { name: any; }; address: { city: any; street: any; suite: any; }; }, b: { company: { name: any; }; address: { city: any; street: any; suite: any; }; }) => {
      let av: any;
      let bv: any;
      if (key === 'company') {
        av = a.company.name;
        bv = b.company.name;
      } else if (key === 'city') {
        av = a.address.city;
        bv = b.address.city;
      } else if (key === 'address') {
        av = `${a.address.street} ${a.address.suite}`;
        bv = `${b.address.street} ${b.address.suite}`;
      } else {
        av = (a as any)[key];
        bv = (b as any)[key];
      }
      if (av == null) av = '';
      if (bv == null) bv = '';
      return av.toString().localeCompare(bv.toString())
    });
  }

  sortAccounts(prop: string) {
    const sorted = this.userData.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    // asc/desc
    if (prop.charAt(0) === '-') { sorted.reverse(); }
    return sorted;
}
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
