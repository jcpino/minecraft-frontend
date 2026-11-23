import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // <--- ESTA ES LA LÍNEA MÁGICA QUE FALTABA
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  listaJugadores: any[] = [];
  http = inject(HttpClient);

  cargarJugadores() {
    this.http.get<any[]>('http://localhost:8080/api/jugadores').subscribe({
      next: (data) => { this.listaJugadores = data; },
      error: (error) => { console.error("Error al conectar con la API:", error); }
    });
  }

  banearJugador(id: number) {
    const url = `http://localhost:8080/api/jugadores/${id}/banear`;
    this.http.put(url, {}).subscribe({
      next: () => { this.cargarJugadores(); },
      error: (error) => { console.error("Error al banear", error); }
    });
  }
}
