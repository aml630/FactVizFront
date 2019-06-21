import { Component, OnInit } from '@angular/core';
import { FactImage } from '../models/fact-images';
import { HttpClient } from '@angular/common/http';
import { Section } from '../models/sections';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-fact-page',
  templateUrl: './fact-page.component.html',
  styleUrls: ['./fact-page.component.scss']
})
export class FactPageComponent implements OnInit {

  tweetUrl: string;
  fbUrl: string;
  pinUrl: string;
  base = environment.apiBase;
  factImages: FactImage[];
  sections: Section[];
  subject: Subject;
  selectedSections: number[] = [];
  searchString = '';
  wordTyping: FormControl;
  changedHeaderImage = '';
  originalHeader = '';
  totalRecords = 0;
  selectedBox = 0;
  selectedSource = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.wordTyping = new FormControl();
    this.wordTyping.valueChanges.pipe(debounceTime(500)).subscribe(x => {
      this.searchString = x;
      this.GetFactImages();
    });

    this.GetSubjectFromPath();

    this.tweetUrl = 'https://twitter.com/intent/tweet/?url=' + document.URL;

    this.fbUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + document.URL;

    this.pinUrl = "https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.flickr.com%2Fphotos%2Fkentbrew%2F6851755809%2F&media=https%3A%2F%2Ffarm8.staticflickr.com%2F7027%2F6851755809_df5b2051c9_z.jpg&description=Next%20stop%3A%20Pinterest"
  }

  ToggleActive(sectionId: number) {
    if (this.selectedSections.includes(sectionId)) {
      const index = this.selectedSections.indexOf(sectionId);
      this.selectedSections.splice(index, 1);
    } else {
      this.selectedSections.push(sectionId);
    }

    this.GetFactImages();
  }

  GetImagePath(imageUrl: string) {
    return environment.apiBase + '/fact-images/' + imageUrl;
  }

  GetFactImages() {
    let path = `/factimages/GetAllForSubject/${this.subject.subjectId}?`;

    if (this.selectedSections.length > 0) {
      for (const sectionId of this.selectedSections) {
        path += '&sectionId=' + sectionId;
      }
    }

    if (this.searchString !== '') {
      path += '&searchString=' + this.searchString;
    }

    this.http.get<Page>(this.base + path).subscribe(x => {
      this.factImages = x.records;
      this.totalRecords = x.totalRecords;
      this.subject.header = this.originalHeader.replace('{num}', this.totalRecords.toString());
    });
  }

  ShowShareBox(shareImageId: number) {
    if (this.selectedBox === shareImageId) {
      this.selectedBox = 0;
    } else {
      this.selectedBox = shareImageId;
    }
  }

  ControlWindow(href: string) {
    const width = 650, height = 450;
    event.preventDefault();
    window.open(href, 'Share Dialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' +
      width + ',height=' + height + ',top=' + (screen.height / 2 - height / 2) + ',left=' + (screen.width / 2 - width / 2));
  }

  PinterestShare(imageUrl: string, factText: string) {
    debugger;
    const pinUrl = document.URL + '&media=' + imageUrl + '&description=' + factText;
    const encodedUrl = 'https://www.pinterest.com/pin/create/button/?url=' + encodeURIComponent(pinUrl);
    this.ControlWindow(encodedUrl);
  }

  ShowSourceBox(shareImageId: number) {
    if (this.selectedSource === shareImageId) {
      this.selectedSource = 0;
    } else {
      this.selectedSource = shareImageId;
    }
  }

  GetSubjectSections() {
    const path = `/sections/GetAllForSubject/${this.subject.subjectId}`;
    this.http.get<Section[]>(this.base + path).subscribe(x => {
      this.sections = x;
    });
  }

  GetSubjectFromPath() {
    let slug = window.location.pathname;
    slug = slug.substring(1);
    const path = `/subjects/GetFromPath?slug=${slug}`;
    this.http.get<Subject>(this.base + path).subscribe(x => {
      this.subject = x;
      this.changedHeaderImage = this.base + '/header-images/' + x.headerImage;
      this.originalHeader = x.header;
      this.GetSubjectSections();
      this.GetFactImages();
    });
  }
}
