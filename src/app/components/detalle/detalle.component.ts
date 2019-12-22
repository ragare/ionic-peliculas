import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle;
  numCaracteres = 150;
  actores: Cast[] = [];

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {
      console.log('Detalle', resp);
      this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula(this.id).subscribe(resp => {
      console.log('Credits', resp);
      this.actores = resp.cast;
    });

  }

  mostrarOverviewCompleto() {
    this.numCaracteres = this.pelicula.overview.length;
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {

  }

}
