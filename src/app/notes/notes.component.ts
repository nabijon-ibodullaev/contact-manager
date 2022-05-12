import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Notes } from '../Models/notes';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styles: [
    `
      table {
        width: 100%;
      }

      .mat-form-field {
        font-size: 14px;
        width: 100%;
      }

      td,
      th {
        width: 25%;
      }
    `,
  ],
})
export class NotesComponent implements OnInit, AfterViewInit {
  @Input() notes!: Notes[];
  displayedColumns: string[] = ['position', 'title', 'date'];
  dataSource!: MatTableDataSource<Notes>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}
  ngOnInit() {
    this.dataSource = new MatTableDataSource<Notes>(this.notes);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
