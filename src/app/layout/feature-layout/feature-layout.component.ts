import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    // moduleId: module.id,
    selector: 'feature-layout',
    templateUrl: 'feature-layout.component.html',
    styleUrls: ['feature-layout.component.scss']
})
export class FeatureLayoutComponent {

     @ViewChild('rightDrawer') rightDrawer!: MatDrawer;
  selected = '';
  isExpanded = false;

  openRight(item: string) {
    this.selected = item;
    this.rightDrawer.open();
  }
}

