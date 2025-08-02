import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective implements OnInit {
  @Input('appPermission') permission: string = '';
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.updateView();
  }
  
  private updateView(): void {
    this.viewContainer.clear();
    
    if (this.authService.hasPermission(this.permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}