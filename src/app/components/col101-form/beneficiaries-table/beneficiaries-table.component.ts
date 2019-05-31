import { Component, OnInit } from '@angular/core';

export interface Beneficiary {
  surname: string;
  lastname: string;
  name: string;
  document: string;
  percent: number;
  kinship: string;
}

const ELEMENT_DATA: Beneficiary[] = [
  {surname: 'Novoa', lastname: 'Reyes', name: 'Daniel', document: '1013644408', percent: 10, kinship: 'Hermano'},
];

@Component({
  selector: 'app-beneficiaries-table',
  templateUrl: './beneficiaries-table.component.html',
  styleUrls: ['./beneficiaries-table.component.less']
})
export class BeneficiariesTableComponent implements OnInit {

  public displayedColumns: string[] = ['surname', 'lastname', 'name', 'document', 'percent', 'kinship'];
  public dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
