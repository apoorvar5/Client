import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.css'
})
export class HelloComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  baseUrl= `${environment.baseUrl}`;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>(this.baseUrl + 'weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}