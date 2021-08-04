import { LoginService } from 'src/app/services/login/login.service';
import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit} from '@angular/core';

import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

import { Subject } from 'rxjs';

import {
  isSameDay,
  isSameMonth
} from 'date-fns';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarioServiceService } from './calendario.service';
import { Pedido } from 'src/app/models/IPedido';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  modalData: {
    action: string;
    event: CalendarEvent;
  };  

  public get calendarView(): typeof CalendarView{
    return CalendarView;
  } 

  pedidosCalendario: Pedido[] = [];
  events: CalendarEvent[] = [];

  viewDate: Date = new Date();
  items: Array<CalendarEvent<{time: any}>> = [];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;  

  rol : string = "";

  constructor(private loginService: LoginService, private modal: NgbModal,
    private calendarioService: CalendarioServiceService) { }

  ngOnInit(): void {
    if (localStorage.getItem('rol') != null) {
      this.rol = localStorage.getItem('rol')!;
    }
    this.calendarioService.getPedidos().subscribe(res => {
      this.pedidosCalendario = res;
      for(let i = 0 ; i < res.length; i++){
        this.items.push(
          {
            id: res[i].pedidoId,
            title: res[i].nombrePedido,
            start: new Date(res[i].fechaIngreso),
            end: new Date(res[i].fechaEntrega),
            color: {primary: '#e3bc08', secondary: '#FDF1BA'},           
            meta: {
              time: res[i].fechaIngreso
            }
          });
          this.events = this.items;
      }});
  };    


  cerrarSesion() {
    this.loginService.logout();
  } 

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }  

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  } 
}