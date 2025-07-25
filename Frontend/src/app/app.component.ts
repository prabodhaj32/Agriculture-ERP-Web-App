import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { HttpClientModule } from '@angular/common/http';
import { ThemeService } from './core/services/theme/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet,HttpClientModule, ResponsiveHelperComponent, NgxSonnerToaster],
})
export class AppComponent {
  title = 'Angular Tailwind';

  constructor(public themeService: ThemeService) {}
}
