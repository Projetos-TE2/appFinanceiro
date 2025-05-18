import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Platform {
  id: string;
  name: string;
  manufacture?: string;
}

@Component({
  selector: 'app-studios',
  templateUrl: './studios.page.html',
  styleUrls: ['./studios.page.scss'],
  standalone: false,
})
export class StudiosPage implements OnInit {
  platforms: Platform[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadPlatforms();
  }

  loadPlatforms() {
    this.http.get<any>('http://localhost:3000/platforms')
      .subscribe(data => {
        this.platforms = data;
      });
  }
}
