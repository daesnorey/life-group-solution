import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { FormControl } from '@angular/forms';
import { MatAnchor, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.less']
})
export class BulkUploadComponent implements OnInit {

  public uploadProgress: number;
  public loading = false;
  public hasErrors = false;

  @ViewChild('tableErrors') tableErrors: ElementRef;
  @ViewChild('downloadLink') downloadLink: MatAnchor;

  constructor(
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadingService.isLoading = false;
    }, 1000);
  }

  public onFileChange(files: FileList) {
    let total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
      total += files.item(i).size;
    }

    this.hasErrors = false;
    this.uploadProgress = 0;
    this.loading = true;
    this.uploadFiles(0);
  }

  private uploadFiles(index: number) {
    this.uploadProgress = index * 10;

    if (index >= 10) {
      if (Math.round(Math.random()) === 1) {
        this.hasErrors = true;
        this.exportTableToExcel();
        this.snackBar.open('Se han encontrado errores en el archivo', 'Entendido', {
          duration: 5000
        });
      } else {
        this.snackBar.open('Archivo cargado exitosamente', 'Entendido', {
          duration: 5000
        });
      }
      return;
    }

    setTimeout(_ => {
      this.uploadFiles(index + 1);
    }, 500);
  }

  /**
   * Exports table to excel
   */
  private exportTableToExcel() {
    const dataType = 'application/vnd.ms-excel';
    const tableSelect = this.tableErrors;
    const tableHTML = tableSelect.nativeElement.outerHTML.replace(/ /g, '%20');

    // Specify file name
    const filename = 'errors.xls';

    if (navigator.msSaveOrOpenBlob) {
      const blob = new Blob(['ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      this.downloadLink._elementRef.nativeElement.href = 'data:' + dataType + ', ' + tableHTML;
      // Setting the file name
      this.downloadLink._elementRef.nativeElement.download = filename;
      setTimeout(_ => {
        // triggering the function
        this.downloadLink._elementRef.nativeElement.click();
      }, 100);
    }
  }
}
