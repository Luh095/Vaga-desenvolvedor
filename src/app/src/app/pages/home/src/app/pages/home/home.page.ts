import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  loading = false;
  favorites: string[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.loadFavorites();
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    if (this.loading) return;
    this.loading = true;
    this.pokemonService.getPokemons(this.offset, this.limit).subscribe(
      (res) => {
        const results = res.results.map((p: any) => {
          const id = this.extractId(p.url);
          return {
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            id,
          };
        });
        this.pokemons = [...this.pokemons, ...results];
        this.offset += this.limit;
        this.loading = false;
        if (event) event.target.complete();
      },
      () => {
        this.loading = false;
        if (event) event.target.complete();
      }
    );
  }

  extractId(url: string): number {
    const segments = url.split('/');
    return +segments[segments.length - 2];
  }

  loadMore(event: any) {
    this.loadPokemons(event);
  }

  goToDetails(name: string) {
    this.router.navigate(['/details', name]);
  }

  loadFavorites() {
    const fav = localStorage.getItem('favorites');
    this.favorites = fav ? JSON.parse(fav) : [];
  }

  toggleFavorite(name: string) {
    if (this.isFavorite(name)) {
      this.favorites = this.favorites.filter((f) => f !== name);
    } else {
      this.favorites.push(name);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(name: string): boolean {
    return this.favorites.includes(name);
  }
}
