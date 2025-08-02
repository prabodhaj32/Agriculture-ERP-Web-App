import { Component, Input } from '@angular/core';
import { DashboardStats } from '../../models/dashboard.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.css'
})
export class StatsCardsComponent {
  @Input() stats: DashboardStats | null = null;
}
