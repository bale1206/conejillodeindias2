import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  map!: mapboxgl.Map;
  geocoder!: MapboxGeocoder;
  fromGeocoder!: MapboxGeocoder;
  toGeocoder!: MapboxGeocoder;

  async ngOnInit() {
    // Set the Mapbox access token
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoidmEtbGF0b3JyZSIsImEiOiJjbTN4OHM2dWMxZzZ6Mmpvcm9mMXdwb3JzIn0.NM_QPXtsWhgSvRZ_NnKRxQ';

    // Initialize the map
    this.map = new mapboxgl.Map({
      container: 'map', // ID of the map container
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [-74.006, 40.7128], // Initial center [lng, lat]
      zoom: 12, // Initial zoom level
    });

    // Add the main Geocoder (Search Box)
    this.geocoder = new MapboxGeocoder({
      accessToken: (mapboxgl as any).accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Search for a place', // Custom placeholder text
      zoom: 14, // Zoom level for search results
      flyTo: true, // Fly to the result location
    });

    // Handle search result events for the main search box
    this.geocoder.on('result', (event: any) => {
      console.log('Search result:', event.result);
      const [lng, lat] = event.result.center;
      this.map.flyTo({ center: [lng, lat], zoom: 14 });
    });

    // Initialize the "From" and "To" Geocoders
    this.fromGeocoder = new MapboxGeocoder({
      accessToken: (mapboxgl as any).accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'From (e.g., 1600 Pennsylvania Ave, Washington, DC)', // Custom placeholder for "From"
      zoom: 14,
      flyTo: false, // Don't automatically fly to the "From" address
    });

    this.toGeocoder = new MapboxGeocoder({
      accessToken: (mapboxgl as any).accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'To (e.g., Times Square, New York, NY)', // Custom placeholder for "To"
      zoom: 14,
      flyTo: false, // Don't automatically fly to the "To" address
    });

    // Handle result for "From" Geocoder
    this.fromGeocoder.on('result', (event: any) => {
      console.log('From address result:', event.result);
      const [lng, lat] = event.result.center;
      // Store "From" location for directions
      this.map.setCenter([lng, lat]);
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
    });

    // Handle result for "To" Geocoder
    this.toGeocoder.on('result', (event: any) => {
      console.log('To address result:', event.result);
      const [lng, lat] = event.result.center;
      // Store "To" location for directions
      this.map.setCenter([lng, lat]);
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
    });

    // Get current position and add marker to the map
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
      console.error('Error getting location:', error);
      return null;
    }
  }

  ionViewDidEnter() {
    const existingGeocoder = document.getElementById('geocoder')?.firstChild;
    if (existingGeocoder) {
      document.getElementById('geocoder')!.removeChild(existingGeocoder);
    }

    document.getElementById('from-geocoder')!.appendChild(this.fromGeocoder.onAdd(this.map));
    document.getElementById('to-geocoder')!.appendChild(this.toGeocoder.onAdd(this.map));
  }

  handleDirections() {
    const from = (document.getElementById('from') as HTMLInputElement).value;
    const to = (document.getElementById('to') as HTMLInputElement).value;

    if (from && to) {
      this.getDirections(from, to);
    } else {
      alert('Please enter both "From" and "To" addresses!');
    }
  }

  async getDirections(from: string, to: string) {
    const accessToken = (mapboxgl as any).accessToken;

    try {
      const fromCoords = await this.geocodeAddress(from, accessToken);

      const toCoords = await this.geocodeAddress(to, accessToken);

      if (!fromCoords || !toCoords) {
        alert('Unable to geocode one or both addresses. Please check and try again.');
        return;
      }

      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoords.join(
        ','
      )};${toCoords.join(',')}?geometries=geojson&access_token=${accessToken}`;

      const response = await fetch(directionsUrl);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0].geometry.coordinates;

        if (this.map.getLayer('route')) {
          this.map.removeLayer('route');
          this.map.removeSource('route');
        }

        this.map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route,
            },
          },
        });

        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#0074d9',
            'line-width': 5,
          },
        });

        const bounds = route.reduce(
          (bounds: any, coord: any) => bounds.extend(coord),
          new mapboxgl.LngLatBounds(route[0], route[0])
        );
        this.map.fitBounds(bounds, { padding: 50 });
      } else {
        console.log('No route found!');
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  }

  async geocodeAddress(address: string, accessToken: string): Promise<[number, number] | null> {
    try {
      const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${accessToken}`;
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        return [lng, lat];
      } else {
        console.error('No results found for the address:', address);
        return null;
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  }
}
