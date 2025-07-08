import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactlistComponent } from './contactlist/contactlist.component';
import { FilterComponent } from './filter/filter.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {path: 'contactlist', component: ContactlistComponent},
  {path: '', component: ContactlistComponent},
  {path: 'filter', component: FilterComponent},
  {path: 'form', component: FormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
