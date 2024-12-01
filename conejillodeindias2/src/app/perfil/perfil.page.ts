import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string = '';
  map!: mapboxgl.Map;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    // Obtener el nombre del usuario de los parámetros de la ruta
    this.route.queryParams.subscribe((params: { [key: string]: string }) => {
      this.username = params['username'] || 'Usuario';
    });

    // Configurar el token de acceso de Mapbox
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoidmEtbGF0b3JyZSIsImEiOiJjbTN4OHM2dWMxZzZ6Mmpvcm9mMXdwb3JzIn0.NM_QPXtsWhgSvRZ_NnKRxQ';

    // Inicializar el mapa
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor del mapa
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-74.006, 40.7128], // Centro inicial del mapa [lng, lat]
      zoom: 12, // Nivel de zoom inicial
    });

    // Obtener la ubicación actual y agregar un marcador
    const coordinates = await this.getCurrentPosition();
    if (coordinates) {
      const { latitude, longitude } = coordinates;
      this.map.setCenter([longitude, latitude]);
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(this.map);
    }
  }

  async getCurrentPosition() {
    try {
      const position = await Geolocation.getCurrentPosition();
      return position.coords;
    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
      return null;
    }
  }
}