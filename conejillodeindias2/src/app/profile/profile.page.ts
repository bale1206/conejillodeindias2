import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  username: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.username = localStorage.getItem('userName') || 'Usuario';
    console.log('username:', this.username);
  }
}

