import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../core/data.service';
import { DataModel } from '../models/data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource<DataModel>();
  displayedColumns: string[] = [
    'description',
    'amount',
    'category',
    'status',
    'due_date',
    'urgency',
    'currency',
  ];
  filter: string;
  filterCheckboxes: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  constructor(private data: DataService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;

    this.getTableInformation();
  }

  getTableInformation() {
    this.data.getTableInformation().subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  setupFilter() {
    this.dataSource.filterPredicate = (d: DataModel, filter: string) => {
      const textToSearch =
        (d['description'] && d['description'].toLowerCase()) || '';
      return textToSearch.indexOf(filter) !== -1;
    };
  }

  setupCheckboxFIlter() {
    this.dataSource.filterPredicate = (data: DataModel, filter: string) => {
      return filter
        .split(',')
        .every((item: string) => data.status.indexOf(item) !== -1);
    };
    this.filterCheckboxes.subscribe((newFilterValue: string[]) => {
      this.dataSource.filter = newFilterValue.join(',');
    });
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  addFilter(change: MatCheckboxChange) {
    this.setupCheckboxFIlter();
    if (
      this.filterCheckboxes.value.some((a: string) => a === change.source.value)
    ) {
      this.filterCheckboxes.next(
        this.filterCheckboxes.value.filter(
          (a: string) => a !== change.source.value
        )
      );
    } else {
      this.filterCheckboxes.next(
        this.filterCheckboxes.value.concat(change.source.value)
      );
    }
  }
}
