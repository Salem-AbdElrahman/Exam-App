import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Flowbite } from './core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('examapp');
  constructor(private flowbiteService: Flowbite) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
