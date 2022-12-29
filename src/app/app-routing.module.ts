import {Component, Directive, HostListener, NgModule} from '@angular/core';
import {ActivatedRoute, RouterModule, RouterOutlet, Routes} from '@angular/router';

@Component({
  template: `
    {{ activatedRoute.snapshot.title }}
    <router-outlet></router-outlet>
  `,
  styles: [`:host { display: block }`]
})
export class TestComponent {
  constructor(public activatedRoute: ActivatedRoute) {}
}

const routes: Routes = [
  {
    path: "root",
    component: TestComponent,
    title: "root",
    children: [
      {
        path: "test",
        component: TestComponent,
        title: "test",
        children: [
          {
            path: "nested",
            component: TestComponent,
            title: "nested"
          }
        ]
      }
    ]
  },
  {
    path: "sibling",
    component: TestComponent,
    title: "sibling"
  }
];

@Directive({ selector: "router-outlet" })
export class RouterOutletExtension {
  constructor(private outlet: RouterOutlet) {}

  @HostListener("activate", ["$event"])
  handleActivate(event: any) {
    console.log(this.outlet.activatedRoute.snapshot.title)
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes, {

  })],
  exports: [RouterModule, RouterOutletExtension],
  declarations: [TestComponent, RouterOutletExtension],
})
export class AppRoutingModule { }
