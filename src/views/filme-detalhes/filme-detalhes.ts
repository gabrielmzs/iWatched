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
    direcao: HTMLElement;
    nomesElenco: HTMLDivElement;



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
        this.direcao = document.getElementById("direcao") as HTMLElement;
        this.nomesElenco = document.getElementById("nomesElenco") as HTMLDivElement;
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
            for (let i = 1; i < filme.generos.length; i++) {
                if (filme.generos[i]) {

                    const novoElementoSpan = document.createElement("span");
                    novoElementoSpan.classList.add("badge", "rounded-pill", "fs-7", "px-2", "py-2", "bg-warning", "text-dark");
                    novoElementoSpan.textContent = filme.generos[i];
                    this.divGeneros.appendChild(novoElementoSpan);
                }
            }
        }

        if (this.direcao) {
            this.direcao.textContent = filme.diretor;
        }

        if (filme.elenco.length > 1) {
            for (let i = 0; i < filme.elenco.length; i++) {
                if (filme.elenco[i]) {

                    const novoBadge = document.createElement("span");
                    novoBadge.classList.add("badge", "rounded-pill", "fs-7", "px-2", "py-2", "bg-black", "text-light");
                    novoBadge.textContent = filme.elenco[i];
                    this.nomesElenco.appendChild(novoBadge);
                }
            }
        }


    }

}

window.addEventListener('load', () => new DetalhesFilme());
