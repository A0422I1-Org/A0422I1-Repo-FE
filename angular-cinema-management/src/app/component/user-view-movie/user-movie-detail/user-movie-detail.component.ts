import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../service/movie/movie.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

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
  bookingButton: boolean | undefined;

  username = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private movieService: MovieService,
    private router: Router
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
    this.bookingPermit();
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

  booking() {
    if (this.username) {
      this.router.navigate(['/booking/select-movie-and-showtime'],
        {queryParams: {movieId: this.movie.id}});
    } else {
      this.router.navigateByUrl('/security/login');
    }
  }

  private bookingPermit(): void {

    // console.log("ádasdhkasjhdkashd");
    // const date = new Date(this.movie.startDay);
    // const today = new Date();
    //
    // const diffTime = Math.abs(date.getTime() - today.getTime());
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //
    // if (diffDays < 3) {
    //   this.bookingButton = true;
    // } else {
    //   this.bookingButton = false;
    // }
  }

}
