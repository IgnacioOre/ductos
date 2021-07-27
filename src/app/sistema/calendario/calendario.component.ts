import { LoginService } from 'src/app/services/login/login.service';

import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit} from '@angular/core';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

import { Subject } from 'rxjs';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  parseISO,
} from 'date-fns';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarioServiceService } from './calendario.service';
import { Pedido } from 'src/app/models/IPedido';
import { DatePipe } from '@angular/common';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  pedidosCalendario: Pedido[] = [];
  events: CalendarEvent[] = [];

  viewDate: Date = new Date();
  items: Array<CalendarEvent<{time: any}>> = [];

  constructor(private loginService: LoginService, private modal: NgbModal,
    private calendarioService: CalendarioServiceService) { }

  ngOnInit(): void {
    this.calendarioService.getPedidos().subscribe(res => {
      for(let i = 0 ; i < res.length; i++){
        this.items.push(
          {
            title: res[i].nombrePedido,
            start: new Date(res[i].fechaIngreso),
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

  getFechaEntregaPedido(){
    this.calendarioService.getPedidos().subscribe(res => {
      this.pedidosCalendario = res;
      console.log(this.pedidosCalendario);      
    })   
  }

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  public get calendarView(): typeof CalendarView{
    return CalendarView;
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fa fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  

  activeDayIsOpen: boolean = true;  

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

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: this.pedidosCalendario[0].nombrePedido,
        start: startOfDay(this.pedidosCalendario[0].fechaIngreso),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
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