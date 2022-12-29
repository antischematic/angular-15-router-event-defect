import {fakeAsync, flush, TestBed} from "@angular/core/testing";
import {Router} from "@angular/router";
import {RouterTestingModule, } from "@angular/router/testing";
import {AppComponent} from "./app.component";
import {AppModule} from "./app.module";

describe("Route extension", () => {
  it("should work", fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    })

    spyOn(console, "log")
    const router = TestBed.inject(Router)
    const fixture = TestBed.createComponent(AppComponent)
    fixture.autoDetectChanges()

    router.navigate(["/root"])
    flush()
    // not needed here for some reason
    // fixture.detectChanges()
    expect(console.log).toHaveBeenCalledWith("root")

    router.navigate(["/root/test/nested"])
    flush()
    // but IS needed here
    fixture.detectChanges()
    expect(console.log).toHaveBeenCalledWith("test")
    expect(console.log).toHaveBeenCalledWith("nested")
  }))
})
