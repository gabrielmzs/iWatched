import "bootstrap";
import './filme-detalhes.css';
import { FilmeService } from "../../services/filme.service";
import { Filme } from "../../models/filme";

declare var YT: any;

export class DetalhesFilme {

    tituloFilme: HTMLElement;
    dataLancamento: HTMLElement;
    poster: HTMLImageElement;
    iFrameTrailer: HTMLIFrameElement;
    sinopse: HTMLElement;
    primeiroGenero: HTMLElement;
    divGeneros: HTMLDivElement;



    private filmeService: FilmeService;
    constructor() {
        this.filmeService = new FilmeService();

        this.registrarElementos()

        const url = new URLSearchParams(window.location.search);

        const id = url.get('id') as string;

        this.pesquisarFilmePorId(id);
    }
    registrarElementos() {
        this.tituloFilme = document.getElementById("tituloFilme") as HTMLElement;
        this.dataLancamento = document.getElementById("dataLancamento") as HTMLElement;
        this.poster = document.getElementById("poster") as HTMLImageElement;
        this.iFrameTrailer = document.getElementById("iFrameTrailer") as HTMLIFrameElement;
        this.sinopse = document.getElementById("sinopse") as HTMLElement;
        this.primeiroGenero = document.getElementById("primeiroGenero") as HTMLElement;
        this.divGeneros = document.getElementById("divGeneros") as HTMLDivElement;
    }

    pesquisarFilmePorId(id: string) {
        this.filmeService.pesquisarPorId(id)
            .then(filme => this.AtualizarDadosFilme(filme))
    }

    AtualizarDadosFilme(filme: Filme) {
        if (this.tituloFilme) {
            const partesData = filme.anoLancamento.split("-");
            this.tituloFilme.textContent = filme.nomePt + " - " + partesData[0];
        }

        if (this.dataLancamento) {
            this.dataLancamento.textContent = filme.anoLancamento;
        }

        if (this.poster) {
            this.poster.src = filme.posterUrl;
        }

        if (this.iFrameTrailer) {

            this.iFrameTrailer.src = filme.videoUrl;
        }

        if (this.sinopse) {
            this.sinopse.textContent = filme.sinopse;
        }

        if (this.primeiroGenero) {
            this.primeiroGenero.textContent = filme.generos[0];
        }
        if (filme.generos.length > 1) {
            const elementoPai = document.querySelector(".d-flex.m-3.gap-2");
            for (let i = 1; i < filme.generos.length; i++) {
                if (filme.generos[i]) {

                    const novoElementoSpan = document.createElement("span");
                    novoElementoSpan.classList.add("badge", "rounded-pill", "fs-4", "px-4", "py-2", "bg-warning", "text-dark");
                    novoElementoSpan.textContent = filme.generos[i];
                    this.divGeneros.appendChild(novoElementoSpan);
                }
            }
        }

        // Atualize as categorias/gêneros (assumindo que há um número fixo de categorias)
        const categorias = document.getElementsByClassName('badge');
        for (let i = 0; i < filme.generos.length; i++) {
            if (filme.generos[i]) {
                categorias[i].textContent = filme.generos[i];
            }
        }
    }

}

window.addEventListener('load', () => new DetalhesFilme());
