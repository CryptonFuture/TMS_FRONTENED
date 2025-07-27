// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { FeatureLayoutComponent } from './feature-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FeatureFooterComponent } from '../feature-footer/feature-footer.component';
import { FeatureHeaderComponent } from '../feature-header/feature-header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FeatureSidebarComponent } from '../feature-sidebar/feature-sidebar.component';


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatMenuModule,
        MatTooltipModule,
        AppRoutingModule
        


    ],
    declarations: [
        FeatureLayoutComponent,
        FeatureFooterComponent,
        FeatureHeaderComponent,
        FeatureSidebarComponent
        
    ],
    exports: [
        FeatureLayoutComponent,
    ]
})
export class FeatureLayoutModule {

}
