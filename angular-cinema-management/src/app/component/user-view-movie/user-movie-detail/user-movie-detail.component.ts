import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../service/movie/movie.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

import {MovieDetailDto} from "../../../dto/movie-detail-dto";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-user-movie-detail',
  templateUrl: './user-movie-detail.component.html',
  styleUrls: ['./user-movie-detail.component.css']
})
export class UserMovieDetailComponent implements OnInit {

  movie: MovieDetailDto | undefined;
  trustedUrl: SafeResourceUrl;

  username: String;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private movieService: MovieService
  ) {
  }

  private subscription: Subscription | undefined;

  ngOnInit(): void {
    const movieId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.subscription = this.movieService.getMovieDetailByMovieId(movieId).subscribe(
      data => {
        this.movie = data;
      },
      error => {
        console.log("get movie detail error")
      },
    )
    ;
  }

  sendLinkTrailer(trailer: string) {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(trailer);
  }
  closeModal() {
    const videoElement = document.getElementById('trailerVideo') as HTMLIFrameElement;
    videoElement.src = videoElement.src; // not replay video
    videoElement.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    document.getElementById('myModal').style.display = 'none'; // close modal
    videoElement.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  }
}
