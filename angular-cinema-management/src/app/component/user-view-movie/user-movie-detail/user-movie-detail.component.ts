import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../service/movie/movie.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import {MovieDetailDTO} from "../../../dto/movie-detail-dto";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RatingMovieService} from "../../../service/rating-movie/rating-movie.service";


@Component({
  selector: 'app-user-movie-detail',
  templateUrl: './user-movie-detail.component.html',
  styleUrls: ['./user-movie-detail.component.css']
})
export class UserMovieDetailComponent implements OnInit {

  movie: MovieDetailDTO | undefined;
  trustedUrl: SafeResourceUrl;
  showBookingButton = false;

  username = 'customer' ;

  rfRating: FormGroup;
  messageForRating = '';

  constructor(
    private formBuilder: FormBuilder,
    private ratingMovieService: RatingMovieService,
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
        this.bookingPermit();
        this.rfRating = this.formBuilder.group({
          username: [this.username],
          rating: [''],
          movieId: [this.movie.id]
        })
      },
      error => {
        console.log("get movie detail error")
      },
    );
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
    if (this.username == null || this.username == '') {
      this.router.navigate(['/booking/select-movie-and-showtime'],
        {queryParams: {movieId: this.movie.id}});
    } else {
      this.router.navigateByUrl('/security/login');
    }
  }

  private bookingPermit(): void {
    const date = new Date(this.movie.startDay);
    const today = new Date();

    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 3) {
      this.showBookingButton = true;
    }
  }

  onSubmit() {
    if (this.username == null || this.username == '') {
      this.messageForRating = 'Bạn cần đăng nhập để thực hiện đánh giá phim \"' + this.movie.name + '\"';
    }
    if (this.rfRating.value.rating == null || this.rfRating.value.rating == ''){
      this.messageForRating = "Bạn cần chọn sao để đánh giá";
    }
    else {
      this.ratingMovieService.save(this.rfRating.value).subscribe(
        (data: any) => {
          this.movie.avgRating = parseFloat(data.avgRatingTemp);
          this.messageForRating = data.messageTemp;
        }, error => { // catch
          console.log(error)
        },
      );
    }
  }
}
