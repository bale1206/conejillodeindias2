import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

  solicitudes = [
    {
      id: 1,
      nombrePasajero: 'Juan Pérez',
      destino: 'Plaza de Maipú',
      hora: '15:30',
      estado: 'Pendiente',
    },
    {
      id: 2,
      nombrePasajero: 'Ana González',
      destino: 'Estadio Nacional',
      hora: '16:00',
      estado: 'Confirmado',
    },
    {
      id: 3,
      nombrePasajero: 'Carlos Fernández',
      destino: 'Santiago Centro',
      hora: '17:00',
      estado: 'Pendiente',
    }
  ];

  constructor() { }

  ngOnInit() { }

  aceptarSolicitud(id: number) {
    // Aquí podrías actualizar el estado de la solicitud en tu base de datos o API
    const solicitud = this.solicitudes.find(s => s.id === id);
    if (solicitud) {
      solicitud.estado = 'Confirmado';
    }
  }

  rechazarSolicitud(id: number) {
    // Similar al aceptar, puedes actualizar el estado a "Rechazado"
    const solicitud = this.solicitudes.find(s => s.id === id);
    if (solicitud) {
      solicitud.estado = 'Rechazado';
    }
  }

}
