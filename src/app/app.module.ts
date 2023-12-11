import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgChartsModule } from 'ng2-charts';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DasboardComponent } from './components/dasboard/dasboard.component';
import { LineChartCommonComponent } from './components/charts/line-chart-common/line-chart-common.component';
import { MatIconModule } from '@angular/material/icon';
import { InputTextModule } from 'primeng/inputtext';
import { BarChartCommonComponent } from './components/charts/bar-chart-common/bar-chart-common.component';
import { MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeeklySalesBoxComponent } from './components/boxs/weekly-sales-box/weekly-sales-box.component';
import { DynamicChartCommonComponent } from './components/charts/dynamic-chart-common/dynamic-chart-common.component';
import { TotalOrderBoxComponent } from './components/boxs/total-order-box/total-order-box.component';
import { WeatherBoxComponent } from './components/boxs/weather-box/weather-box.component';
import { PieChartCommonComponent } from './components/charts/pie-chart-common/pie-chart-common.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DasboardComponent,
    LineChartCommonComponent,
    DynamicChartCommonComponent,
    BarChartCommonComponent,
    WeeklySalesBoxComponent,
    TotalOrderBoxComponent,
    WeatherBoxComponent,
    PieChartCommonComponent,
    SideBarComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    NgChartsModule,
    MatIconModule,
    InputTextModule,
    MenuModule,
    ToastModule,
    BrowserAnimationsModule,
    BadgeModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
