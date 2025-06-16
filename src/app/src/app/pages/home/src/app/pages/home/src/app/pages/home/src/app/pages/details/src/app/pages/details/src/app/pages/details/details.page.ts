import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  pokemonName: string = '';
  pokemonData: any;
  favorites: string[] = [];

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonName = this.route.snapshot.paramMap.get('name') || '';
    this.loadFavorites();
    this.loadPokemonDetails();
  }

  loadPokemonDetails() {
    this.pokemonService.getPokemonByName(this.pokemonName).subscribe((data) => {
      this.pokemonData = data;
    });
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
