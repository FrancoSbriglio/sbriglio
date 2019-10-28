import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IListaAmigos } from 'app/shared/model/lista-amigos.model';

@Component({
  selector: 'jhi-lista-amigos-detail',
  templateUrl: './lista-amigos-detail.component.html'
})
export class ListaAmigosDetailComponent implements OnInit {
  listaAmigos: IListaAmigos;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ listaAmigos }) => {
      this.listaAmigos = listaAmigos;
    });
  }

  previousState() {
    window.history.back();
  }
}
