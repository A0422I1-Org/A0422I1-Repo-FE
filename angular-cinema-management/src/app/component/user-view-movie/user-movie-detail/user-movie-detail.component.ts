import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../../service/movie/movie.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import {MovieDetailDTO} from "../../../dto/movie-detail-dto";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RatingMovieService} from "../../../service/rating-movie/rating-movie.service";
import {TokenStorageService} from "../../../service/token/token-storage.service";

@Component({
  selector: 'app-user-movie-detail',
  templateUrl: './user-movie-detail.component.html',
  styleUrls: ['./user-movie-detail.component.css']
})
export class UserMovieDetailComponent implements OnInit{

  movie: MovieDetailDTO | undefined;
  trustedUrl: SafeResourceUrl;
  showBookingButton = false;

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
  }

  private subscription: Subscription | undefined;
  isOpenVideo: boolean;

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
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  sendLinkTrailer(trailer: string) {
    this.isOpenVideo = this.isYoutubeLink(trailer);
    if (this.isOpenVideo){
      this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(trailer);
    }
    else {
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
    }
  }

  imageError(event: Event) {
    (event.target as HTMLImageElement).style.border = 'none';
  }

}
