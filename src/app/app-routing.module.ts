import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultListComponent } from './result-list/result-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { PostPageComponent } from './post-page/post-page.component';
import { AddInformationComponent } from './add-information/add-information.component';
import { CreateGigComponent } from './create-gig/create-gig.component';


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'Homepage', component: HomepageComponent },
  {path:'ResultList',component:ResultListComponent,},
  {path:'Profile/:userId',component:ProfileComponent,},
  {path:'PostPage/:postId',component:PostPageComponent,},
  {path:'information',component:AddInformationComponent,},
  {path:'CreateGig',component:CreateGigComponent,},



  /*
  {path: 'Login',
  component: LoginComponent,
  children:[
   { path: '', redirectTo: '/Login/SignIn', pathMatch: 'full' },
   {path:'SignIn', component: SignInComponent },
   {path:'SignUp',component: SignUpComponent }
  ]
  },
  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



