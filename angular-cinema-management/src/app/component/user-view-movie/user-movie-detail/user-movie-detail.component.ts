import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../service/movie/movie.service";
import {of, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import {MovieDetailDTO} from "../../../dto/movie-detail-dto";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RatingMovieService} from "../../../service/rating-movie/rating-movie.service";
import {TokenStorageService} from "../../../service/token/token-storage.service";
import {RatingMovieDTO} from "../../../dto/rating-movie-dto";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-user-movie-detail',
  templateUrl: './user-movie-detail.component.html',
  styleUrls: ['./user-movie-detail.component.css']
})
export class UserMovieDetailComponent implements OnInit {

  movie: MovieDetailDTO | undefined;
  trustedUrl: SafeResourceUrl;
  showBookingButton = false;
  ratingMovieExist: RatingMovieDTO;

  username: string;
  roles: string[] = [];

  rfRating: FormGroup;
  messageForRating = '';

  constructor(
    private formBuilder: FormBuilder,
    private ratingMovieService: RatingMovieService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private movieService: MovieService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
  ) {
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  private subscription: Subscription | undefined;
  isOpenVideo: boolean;
  private ratingTemp: number;
  isHasRated = false;

  ngOnInit(): void {
    const movieId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.subscription = this.ratingMovieService.getRatingMovieByUsernameAndMovieId(this.username, movieId).pipe(
      catchError(error => {
        console.log('Error: ', error);
        this.ratingMovieExist = null;
        return of(null);
        this.ratingTemp = 0;

      })
    ).subscribe(
      data => {
        if(data){
          this.ratingMovieExist = data;
          this.ratingTemp = this.ratingMovieExist.rating;
          this.isHasRated = true;
        }
        this.subscription = this.movieService.getMovieDetailByMovieId(movieId).subscribe(
          data => {
            this.movie = data;
            console.log(this.movie);
            this.bookingPermit();
            this.rfRating = this.formBuilder.group({
              username: [this.username],
              rating: [this.ratingTemp],
              movieId: [this.movie.id]
            });
            console.log(this.ratingMovieExist);
            console.log(this.movie);
          }
        )
      },
      error => {
        console.log("get movie detail error")
      },
    );
  }

  sendLinkTrailer(trailer: string) {
    this.isOpenVideo = this.isYoutubeLink(trailer);
    if (this.isOpenVideo) {
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(trailer);
    } else {
    }
  }

  isYoutubeLink(link: string): boolean {
    const youtubeLinkRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeLinkRegex.test(link);
  }


  closeModal() {
    const videoElement = document.getElementById('trailerVideo') as HTMLIFrameElement;
    videoElement.src = videoElement.src; // not replay video
    videoElement.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    document.getElementById('myModal').style.display = 'none'; // close modal
    videoElement.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  }

  booking() {
    if (this.username == null) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigate(['/booking/select-movie-and-showtime'],
        {queryParams: {movieId: this.movie.id}});
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
    if (this.roles.includes('ROLE_EMPLOYEE')) {
      this.showBookingButton = false;
    }

  }

  onSubmit() {
    if (this.username == null) {
      this.messageForRating = 'Bạn cần đăng nhập để thực hiện đánh giá phim \"' + this.movie.name + '\"';
    } else if (this.rfRating.value.rating == null || this.rfRating.value.rating == '') {
      this.messageForRating = "Bạn cần chọn sao để đánh giá";
    } else {
      this.ratingMovieService.save(this.rfRating.value).subscribe(
        (data: any) => {
          this.movie.avgRating = parseFloat(data.avgRatingTemp);
          this.messageForRating = data.messageTemp;
        }, error => { // catch
          console.log(error)
        },
      );
      this.isHasRated = true;
    }
     }

  imageError(event: Event) {
    (event.target as HTMLImageElement).style.border = 'none';
  }

}
