import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: any[] = [];

  peliculasPorGenero: any[] = [];

  constructor(
    private dataLocalService: DataLocalService,
    private movieService: MoviesService
    ) {}

  async ngOnInit() {

  }

  async ionViewWillEnter() {
    console.log('WillEntyer');
    this.peliculas = await this.dataLocalService.cargarFavoritos();
    this.generos = await this.movieService.cargarGeneros();
    this.cargarPeliculasPorGenero(this.generos, this.peliculas);
  }

  cargarPeliculasPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    generos.map( g => {
      const peliculaPorGenero = {
        genero: '',
        peliculas: []
      };
      peliculaPorGenero.genero = g.name;
      peliculaPorGenero.peliculas = peliculas.filter(p => {
        const tieneGenero = p.genres.find( pg => pg.id === g.id);
        return (tieneGenero) ? true : false;
      });
      if (peliculaPorGenero.peliculas.length > 0) {
        this.peliculasPorGenero.push(peliculaPorGenero);
      }
    });
  }
}
