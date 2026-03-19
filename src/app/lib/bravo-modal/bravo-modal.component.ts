import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject } from '@angular/core';
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
                .flexibleConnectedTo(this._elRef)
                .withPositions([
                    {
                        originX: "start",
                        originY: "bottom",
                        overlayX: "start",
                        overlayY: "top"
                    }
                ])
        }
        const overlayRef = this.overlay.create(config);
        const componentPortal = new ComponentPortal(SomethingComponent);
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

export class SomethingComponent  {
    constructor(private cd: ChangeDetectorRef) {
        console.log(this.cd);
    }
}