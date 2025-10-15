import { Component } from '@angular/core';
import { UserServiceService } from '../shared/user-service.service';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  
  constructor(private userService: UserServiceService) {}

  users: any;
  error: string | null = null;
 
  public chartData: ChartData<'bar' | 'pie'> = { labels: [], datasets: [] };
  public chartOptions: ChartOptions = { responsive: true };
 
 
  ngOnInit() {
    this.userService.getData().subscribe({
      next: users => { this.users = users;this.createChart(); },
      error: err => {  this.error = 'Failed to load analytics.' }
    })
  }
 
  createChart() {
    const map = new Map<string, number>();
    this.users.forEach((u: { company: { name: string; }; }) => {
      const name = u.company?.name || 'Unknown';
      map.set(name, (map.get(name) || 0) + 1);
    });
 
    const labels = Array.from(map.keys());
    const values = Array.from(map.values());
 
    this.chartData = {
      labels,
      datasets: [{ data: values, label: 'Users per Company' }]
    };
  }
}
