import { Component, OnInit } from '@angular/core';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap/';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap/';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { InformeService } from './informe.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  
  constructor(public informeService : InformeService, calendar: NgbCalendar) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  
  totalIngresos : number;
  totalPedidos : number;
  datosCargados : boolean;
  ngOnInit(): void {

  }

  getDatosPedidos(from : Date, to : Date) {
    this.datosCargados = false;
    this.informeService.getDatosPedido({from : from, to: to}).subscribe(res => {
      console.log(res);
      this.totalIngresos = res[0].total;
      this.totalPedidos = res[0].numPedidos;
      this.datosCargados = true;
    })
  }

  generarInforme() {
    this.totalIngresos = 0;
    this.totalPedidos = 0;
    var jsDateFrom = new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day);
    var jsDateTo = new Date();
    if (this.toDate != null) {
      jsDateTo = new Date(this.toDate.year, this.toDate.month-1, this.toDate.day);
    }
    this.getDatosPedidos(jsDateFrom, jsDateTo);


  }

  

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

}
