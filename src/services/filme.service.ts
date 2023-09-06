import { Filme } from "../models/filme";

export class FilmeService {

    chave = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjYzMTRmODdjYzAzZWIzOGQ5M2FlNzNhN2EwODVlYSIsInN1YiI6IjY0Zjc3OTFlNGNjYzUwMDEzODhjZjMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KVSgGIzzpgGgi7p12FG2DBh8yT76qWE8_ITI8L6UBdw';


    pesquisarPorId(id: string): Promise<Filme> {
        const url = 'https://api.themoviedb.org/3/movie/' + id + '?language=pt-BR';

        return fetch(url, this.obterHeaderAutorizacao())
            .then(res => res.json())
            .then((obj: any): Promise<Filme> => this.mapearFilme(obj));
    }


    async mapearFilme(obj: any): Promise<Filme> {

        const nomesDosGeneros = obj.genres.map((genero: any) => genero.name);

        const diretor = await this.pesquisarDiretor(obj.id);
        const elenco = await this.pesquisarElenco(obj.id);

        const link = await this.pequisarVideo(obj.id);
        console.log(link);
        let key = "";
        if (link == undefined) {
            key = "https://www.youtube.com";
        }
        else {
            key = link.key as string;

        }


        return {

            id: obj.id,
            nomePt: obj.title,
            nomeOriginal: obj.original_title,
            generos: nomesDosGeneros,
            sinopse: obj.overview,
            posterUrl: "https://image.tmdb.org/t/p/original/" + obj.poster_path,
            videoUrl: "https://www.youtube.com/embed/" + key,
            anoLancamento: obj.release_date,
            diretor: diretor,
            elenco: elenco,

        }
    }
    async pesquisarDiretor(id: any): Promise<any> {
        const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`;

        const response = await fetch(url, this.obterHeaderAutorizacao());
        const data = await response.json();

        let diretor = null;
        for (const crewMember of data.crew) {
            if (crewMember.department === "Directing") {
                diretor = crewMember.name;
                break;
            }
        }

        return diretor as string;
    }

    async pesquisarElenco(id: any): Promise<any[]> {

        const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=pt-BR`;

        const response = await fetch(url, this.obterHeaderAutorizacao());
        const data = await response.json();

        if (data.cast && data.cast.length >= 10) {
            return data.cast.slice(0, 10).map((membro: any) => membro.name);
        } else {
            console.log("Não há informações suficientes no elenco.");
            return [];
        }
    }




    async mapearLista(obj: any): Promise<Filme> {
        // console.log(obj)

        return {

            id: obj.id,
            nomePt: obj.title,
            nomeOriginal: obj.original_title,
            generos: ['', ''],
            sinopse: obj.overview,
            posterUrl: "https://image.tmdb.org/t/p/original/" + obj.poster_path,
            videoUrl: "https://www.youtube.com/embed/",
            anoLancamento: obj.release_date,
            diretor: "",
            elenco: []

        }
    }



    pequisarVideo(id: any): Promise<any> {
        const url = 'https://api.themoviedb.org/3/movie/' + id + '/videos?language=pt-BR';

        return fetch(url, this.obterHeaderAutorizacao())
            .then(res => res.json())
            .then(data => {
                return data.results[data.results.length - 1] as string;
            });

    }



    PesquisarListaEmAlta(): Promise<Filme[]> {

        const url = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1';

        return fetch(url, this.obterHeaderAutorizacao())
            .then(res => res.json())
            // .then(obj => console.log(obj))
            .then((obj: any): Promise<Filme[]> => this.mapearListaFilme(obj.results));
    }

    private mapearListaFilme(objetos: any[]): any {
        const filmes = objetos.map(obj => this.mapearLista(obj))

        return Promise.all(filmes);

    }

    private obterHeaderAutorizacao() {

        return {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${this.chave}`,
            },
        }
    }


}



