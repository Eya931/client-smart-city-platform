import { Routes } from '@angular/router';

export const AIR_QUALITY_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'sensors-list',
    pathMatch: 'full'
  },
  {
    path: 'sensors-list/:id',
    loadComponent: () => import('./sensors-list/sensors-list').then(m => m.SensorsList)
  },
  {
    path: 'sensor-details/:id',
    loadComponent: () => import('./sensor-details/sensor-details').then(m => m.SensorDetails)
  }
];