import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { ResultadosBuscar, ResultadoBusqueda } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'Avengers', 'El señor de los anillos', 'La vida es bella'];
  resultadosBuscar: ResultadoBusqueda[] = [];
  enBusqueda = false;

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController) { }

  buscar(event) {
    const valor = event.detail.value;
    this.enBusqueda = true;
    if (valor) {
      this.moviesService.buscarPeliculas(valor).subscribe(resp => {
        this.resultadosBuscar = resp.results;
        this.enBusqueda = false;
      });
    } else {
      this.resultadosBuscar = [];
      this.enBusqueda = false;
    }
  }

  async verDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
