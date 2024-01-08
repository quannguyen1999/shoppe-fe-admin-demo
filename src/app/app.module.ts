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
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ButtonModule } from 'primeng/button';
import { MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropColumnComponent } from './components/drag-drop-column/drag-drop-column.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AnimationEnvComponent } from './components/animation-env/animation-env.component';
import { CreateAccountComponent } from './components/accounts/create-account/create-account.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PageNotFoundComponent } from './components/status/page-not-found/page-not-found.component';
import { CategorysComponent } from './components/categorys/categorys.component';
import { ProductsComponent } from './components/products/products.component';
import { TitleComponentComponent } from './components/utils/title-component/title-component.component';
import { TableUtilComponentComponent } from './components/utils/table-util-component/table-util-component.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountServiceService } from './services/account-service.service';
import { GraphQLModule } from './config/graphql.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {MatRadioModule} from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
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
    AccountsComponent,
    DragDropColumnComponent,
    AnimationEnvComponent,
    CreateAccountComponent,
    PageNotFoundComponent,
    CategorysComponent,
    ProductsComponent,
    TitleComponentComponent,
    TableUtilComponentComponent
  ],
  imports: [
    MatRadioModule,
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
    MatPaginatorModule,
    DragDropModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatDialogModule,
    HttpClientModule,
    GraphQLModule,
    ProgressSpinnerModule,
    MatSortModule
  ],
  providers: [MessageService, AccountServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
