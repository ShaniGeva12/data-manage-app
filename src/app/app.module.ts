import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsComponent } from './components/tags/tags.component';
import { AddTagComponent } from './components/tags/components/add-tag/add-tag.component';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { GridViewComponent } from './components/tags/components/grid-view/grid-view.component';
import { ListViewComponent } from './components/tags/components/list-view/list-view.component';

@NgModule({
  declarations: [
    AppComponent,
    TagsComponent,
    AddTagComponent,
    GridViewComponent,
    ListViewComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
