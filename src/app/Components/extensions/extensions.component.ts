import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CndjsService } from 'src/app/Services/cdnjs.service';

@Component({
  selector: 'app-extensions',
  templateUrl: './extensions.component.html',
  styleUrls: ['./extensions.component.css'],
})
export class ExtensionsComponent implements OnInit, AfterViewInit {
  @Input() show!: boolean;
  @Input() allPackages: any;
  @Output() SelectedPackage: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('listResults') listResults!: ElementRef;

  constructor(private cdnjsSVC: CndjsService) {}

  Package: any[] = [];
  SearchPackage = new FormControl('');
  TotalPackages!: number | null;
  PackageName!: string | null;

  ngOnInit(): void {
    this.SearchPackage.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (value?.length === 0) {
          this.TotalPackages = null;
          this.Package = [];
        }

        this.PackageName = value;
        this.cdnjsSVC.getPackage(value, 0)?.subscribe((data: any) => {
          this.TotalPackages = data.nbHits;
          this.Package = data.hits;
        });
      });
  }

  ngAfterViewInit(): void {
    let pageNumber = 0;
    this.listResults.nativeElement.addEventListener('scroll', (e: any) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;

      if (scrollTop + clientHeight >= scrollHeight) {
        pageNumber++;
        this.cdnjsSVC
          .getPackage(this.PackageName, pageNumber)
          ?.subscribe((data: any) => {
            this.Package = [...this.Package, ...data.hits];
          });
      }
    });
  }

  PackageSelected(nameLibrary: string, version: number) {
    const cdn = `https://cdn.jsdelivr.net/npm/${nameLibrary}@${version}/+esm`;

    const name = nameLibrary.replace(/[-@\/\s]/g, '');

    this.SelectedPackage.emit({ cdn, name });
  }
}
