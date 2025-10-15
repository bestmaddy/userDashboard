import { routes } from './../app.routes';
import { UserServiceService } from './../shared/user-service.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  params: any;
  userDetils: any;
  constructor(private route: ActivatedRoute, private routes: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const data = this.route.snapshot.queryParamMap.get('data');
    if (data) {
      this.userDetils = JSON.parse(atob(data));
      console.log('set user ', this.userDetils);
    }
  }
  back() {
    this.routes.navigate(['/User_list']);
  }
}
