import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailsPage } from './details.page';
import { DetailsPageRoutingModule } from './details-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, DetailsPageRoutingModule],
  declarations: [DetailsPage],
})
export class DetailsPageModule {}
