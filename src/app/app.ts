import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from './ui/button/button';
import { RaisedButton } from './ui/raised-button/raised-button';
import { Card } from './ui/card/card';
import { Navbar } from './ui/navbar/navbar';

@Component({
  imports: [RouterOutlet, Button, RaisedButton, Card, Navbar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('dr-doro');
}
