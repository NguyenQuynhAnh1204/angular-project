import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject, Injector } from '@angular/core';
import { UploadFileComponent } from 'src/app/features/upload-file/uploadfile.component';

@Component({
    standalone: true,
    selector: 'br-modal',
    templateUrl: './bravo-modal.component.html',
    styleUrls: ["./bravo-modal.component.scss"],
    imports: [CommonModule, OverlayModule]
})

export class BravoModalComponent {

    private _elRef = inject(ElementRef);
    constructor(private overlay: Overlay) {}
    public openOverlay() {
        const uploadFile = document.getElementById("upload-file")
        const config = {
            hasBackdrop: true,
            backdropClass: "color-back",
            panelClass: "panel-class",
            positionStrategy: this.overlay
                .position()
                .global()
                .centerHorizontally()
                .centerVertically()
        }
        const overlayRef = this.overlay.create(config);
        const injector = Injector.create({
            providers: [
                { provide: OverlayRef, useValue: overlayRef }
            ]
        });
        const componentPortal = new ComponentPortal(UploadFileComponent, null, injector);
        overlayRef.attach(componentPortal);
        overlayRef.backdropClick().subscribe(() => overlayRef.detach());
    }
}


@Component({
    standalone: true,
    selector: 'something',
    template: `
        <p>Hello Modal</p>
    `
})

export class SomethingComponent  {}