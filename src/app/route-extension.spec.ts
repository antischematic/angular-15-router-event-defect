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
    // this can be called before detectChanges for some reason
    expect(console.log).toHaveBeenCalledWith("root")
    // autoDetectChanges doesn't work, have to call manually
    fixture.detectChanges()
    // but this will fail unless change detection is run manually
    expect(fixture.nativeElement.textContent).toContain("root")

    router.navigate(["/root/test/nested"])
    flush()
    // autoDetectChanges doesn't work, have to call manually
    fixture.detectChanges()
    // these must be called AFTER detectChanges or the test fails
    expect(console.log).toHaveBeenCalledWith("test")
    expect(console.log).toHaveBeenCalledWith("nested")

    expect(fixture.nativeElement.textContent).toContain("test")
    expect(fixture.nativeElement.textContent).toContain("nested")
  }))
})
