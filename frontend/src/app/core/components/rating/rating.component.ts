import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() reviewUrl!: [string];
  @Input() rating!: number;
  @Input() numReviews!: number;

  stars: string[] = [];

  ngOnInit() {
    this.populateStars();
  }

  private populateStars() {

    // Calculate stars based on rating 
    const starCount = Math.floor(this.rating);

    // Loop to add full stars
    for (let i = 0; i < starCount; i++) {
      this.stars.push('star');
    }

    // Add half star if decimal
    if (this.rating - starCount === 0.5) {
      this.stars.push('star_half');
    }

    // Add outline stars for remaining
    while (this.stars.length < 5) {
      this.stars.push('star_outline');
    }
  }

}
