import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'feature-header',
  templateUrl: './feature-header.component.html',
  styleUrls: ['./feature-header.component.scss']
})
export class FeatureHeaderComponent {
  @Output() toggle = new EventEmitter<void>();

  onMenuClick() {
    this.toggle.emit();
  }
}
