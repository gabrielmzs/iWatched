import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import "bootstrap";
import { FilmeService } from '../services/filme.service';
import { Filme } from '../models/filme';

console.log(uuidv4());

class TelaInicio {

    gridFilmes: HTMLElement;

    private filmeService: FilmeService;
    constructor() {
        this.filmeService = new FilmeService();
        this.registrarElementos();

        this.filmeService.PesquisarListaEmAlta()
            .then(filmes => this.GerarListaEmAlta(filmes));
    }
    registrarElementos() {
        this.gridFilmes = document.getElementById("gridFilmes") as HTMLElement;
    }

    GerarListaEmAlta(filmes: Filme[]): any {
        for (let filme of filmes) {
            const card = this.GerarFilme(filme);

            this.gridFilmes.appendChild(card);
        }
    }

    GerarFilme(filme: Filme) {
        const bloco = document.createElement('div');
        bloco.classList.add('col-6', 'col-md-4', 'col-lg-2', 'mb-4'); // Adicione as classes do Bootstrap

        const dGrid = document.createElement('div');
        dGrid.classList.add('d-grid', 'gap-1', 'text-center'); // Adicione as classes do Bootstrap

        const assistidoEm = document.createElement('p');
        assistidoEm.classList.add('text-light', 'text-decoration-none', 'mb-0');
        assistidoEm.id = 'assistidoEm';
        assistidoEm.textContent = 'Assistido em: 04/09/2023';

        const imagem = document.createElement('img');
        imagem.classList.add('img-fluid', 'rounded-3');
        imagem.id = 'poster';
        imagem.src = filme.posterUrl;

        const titulo = document.createElement('a');
        titulo.classList.add('fs-6', 'link-light', 'text-decoration-none');
        titulo.id = 'titulo';
        titulo.textContent = filme.nomePt;

        const anoLancamento = document.createElement('p');
        anoLancamento.classList.add('text-light', 'text-decoration-none');
        anoLancamento.id = 'anoLancamento';
        const partesData = filme.anoLancamento.split("-");
        anoLancamento.textContent = partesData[0];

        dGrid.appendChild(assistidoEm);
        dGrid.appendChild(imagem);
        dGrid.appendChild(titulo);
        dGrid.appendChild(anoLancamento);

        bloco.appendChild(dGrid);

        bloco.addEventListener('click', () => this.redirecionarUsuario(filme.id))
        return bloco;
    }
    redirecionarUsuario(id: number): any {
        window.location.href = "filme-detalhes.html?id=" + id;
    }


    // GerarFilme(filme: Filme) {

    //     const bloco = document.createElement('div');

    //     const imagem = document.createElement("img");
    //     imagem.src = filme.posterUrl;


    //     const titulo = document.createElement('a');

    //     titulo.textContent = filme.nomePt;


    //     const data = document.createElement('p');

    //     const partesData = filme.anoLancamento.split("-");
    //     data.textContent = partesData[0];



    //     bloco.appendChild(titulo);
    //     bloco.appendChild(data);
    //     bloco.appendChild(imagem);

    //     return bloco
    // }


}

window.addEventListener('load', () => new TelaInicio());