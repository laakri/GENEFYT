import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultListComponent } from './result-list/result-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { PostPageComponent } from './post-page/post-page.component';
import { AddInformationComponent } from './add-information/add-information.component';
import { CreateGigComponent } from './create-gig/create-gig.component';
import { CodeInformationComponent } from './code-information/code-information.component';
import { UserslistComponent } from './admin/userslist/userslist.component';
import { ContactusComponent } from './contactus/contactus.component';

import { AuthGuard } from './login/user.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'Homepage', component: HomepageComponent },
  { path: 'ResultList', component: ResultListComponent },
  { path: 'Profile/:userId', component: ProfileComponent },
  { path: 'PostPage/:postId', component: PostPageComponent },
  { path: 'ContactUs', component: ContactusComponent },
  {
    path: 'information',
    component: AddInformationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'CreateGig',
    component: CreateGigComponent,
    canActivate: [AuthGuard],
  },
  { path: 'AboutUs', component: CodeInformationComponent },
  {
    path: 'Userslist',
    component: UserslistComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
