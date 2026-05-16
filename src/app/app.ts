import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Flowbite } from './core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { NgxSpinnerComponent } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerComponent],
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
