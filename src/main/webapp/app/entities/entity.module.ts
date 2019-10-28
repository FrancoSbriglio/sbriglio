import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'norma-barrio',
        loadChildren: () => import('./norma-barrio/norma-barrio.module').then(m => m.SbriglioNormaBarrioModule)
      },
      {
        path: 'barrio',
        loadChildren: () => import('./barrio/barrio.module').then(m => m.SbriglioBarrioModule)
      },
      {
        path: 'estado-persona',
        loadChildren: () => import('./estado-persona/estado-persona.module').then(m => m.SbriglioEstadoPersonaModule)
      },
      {
        path: 'persona',
        loadChildren: () => import('./persona/persona.module').then(m => m.SbriglioPersonaModule)
      },
      {
        path: 'domicilio',
        loadChildren: () => import('./domicilio/domicilio.module').then(m => m.SbriglioDomicilioModule)
      },
      {
        path: 'lista-amigos',
        loadChildren: () => import('./lista-amigos/lista-amigos.module').then(m => m.SbriglioListaAmigosModule)
      },
      {
        path: 'espacio-comun',
        loadChildren: () => import('./espacio-comun/espacio-comun.module').then(m => m.SbriglioEspacioComunModule)
      },
      {
        path: 'periodo-espacio-comun',
        loadChildren: () => import('./periodo-espacio-comun/periodo-espacio-comun.module').then(m => m.SbriglioPeriodoEspacioComunModule)
      },
      {
        path: 'carnet-de-conducir',
        loadChildren: () => import('./carnet-de-conducir/carnet-de-conducir.module').then(m => m.SbriglioCarnetDeConducirModule)
      },
      {
        path: 'planilla-ingreso-egreso',
        loadChildren: () =>
          import('./planilla-ingreso-egreso/planilla-ingreso-egreso.module').then(m => m.SbriglioPlanillaIngresoEgresoModule)
      },
      {
        path: 'qr',
        loadChildren: () => import('./qr/qr.module').then(m => m.SbriglioQRModule)
      },
      {
        path: 'reporte',
        loadChildren: () => import('./reporte/reporte.module').then(m => m.SbriglioReporteModule)
      },
      {
        path: 'evento',
        loadChildren: () => import('./evento/evento.module').then(m => m.SbriglioEventoModule)
      },
      {
        path: 'detalle-evento',
        loadChildren: () => import('./detalle-evento/detalle-evento.module').then(m => m.SbriglioDetalleEventoModule)
      },
      {
        path: 'estado-evento',
        loadChildren: () => import('./estado-evento/estado-evento.module').then(m => m.SbriglioEstadoEventoModule)
      },
      {
        path: 'vehiculo',
        loadChildren: () => import('./vehiculo/vehiculo.module').then(m => m.SbriglioVehiculoModule)
      },
      {
        path: 'color',
        loadChildren: () => import('./color/color.module').then(m => m.SbriglioColorModule)
      },
      {
        path: 'seguro',
        loadChildren: () => import('./seguro/seguro.module').then(m => m.SbriglioSeguroModule)
      },
      {
        path: 'aseguradora',
        loadChildren: () => import('./aseguradora/aseguradora.module').then(m => m.SbriglioAseguradoraModule)
      },
      {
        path: 'marca',
        loadChildren: () => import('./marca/marca.module').then(m => m.SbriglioMarcaModule)
      },
      {
        path: 'modelo',
        loadChildren: () => import('./modelo/modelo.module').then(m => m.SbriglioModeloModule)
      },
      {
        path: 'art',
        loadChildren: () => import('./art/art.module').then(m => m.SbriglioArtModule)
      },
      {
        path: 'mensaje',
        loadChildren: () => import('./mensaje/mensaje.module').then(m => m.SbriglioMensajeModule)
      },
      {
        path: 'empresa',
        loadChildren: () => import('./empresa/empresa.module').then(m => m.SbriglioEmpresaModule)
      },
      {
        path: 'novedades',
        loadChildren: () => import('./novedades/novedades.module').then(m => m.SbriglioNovedadesModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class SbriglioEntityModule {}
