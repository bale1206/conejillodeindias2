import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  username: string | null = '';  

  ngOnInit() {
    this.username = localStorage.getItem('userName') || 'Usuario';  
  }
}