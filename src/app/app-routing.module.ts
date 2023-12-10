import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';

 export const routes: Routes = [

  {path:"",component:HomeComponent},
  {path:"p",component:ProfileUserComponent}
  
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
