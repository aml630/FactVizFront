import { Component, OnInit } from '@angular/core';
import { FactImage } from '../models/fact-images';
import { HttpClient } from '@angular/common/http';
import { Section } from '../models/sections';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fact-page',
  templateUrl: './fact-page.component.html',
  styleUrls: ['./fact-page.component.scss']
})
export class FactPageComponent implements OnInit {

  base = environment.apiBase;
  factImages: FactImage[];
  sections: Section[];
  selectedSections: number[] = [];
  searchString = '';
  wordTyping: FormControl;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.wordTyping = new FormControl();
    this.wordTyping.valueChanges.pipe(debounceTime(500)).subscribe(x => {
      this.searchString = x;
      this.GetFactImages();
    });

    this.GetFactImages();

    this.GetSubjectSections();
  }

  ToggleActive(sectionId: number) {
    if (this.selectedSections.includes(sectionId)) {
      const index = this.selectedSections.indexOf(sectionId);
      this.selectedSections.splice(index);
    } else {
      this.selectedSections.push(sectionId);
    }

    this.GetFactImages();
  }

  GetImagePath(imageUrl: string) {
    return environment.apiBase + '/fact-images/' + imageUrl;
  }

  GetFactImages() {
    let path = '/factimages/GetAllForSubject/2?';

    if (this.selectedSections.length > 0) {
      for (const sectionId of this.selectedSections) {
        path += '&sectionId=' + sectionId;
      }
    }

    if (this.searchString !== '') {
      path += '&searchString=' + this.searchString;
    }

    this.http.get<FactImage[]>(this.base + path).subscribe(x => {
      this.factImages = x;
    });
  }

  GetSubjectSections() {
    const path = '/sections/GetAllForSubject/2';
    this.http.get<Section[]>(this.base + path).subscribe(x => {
      this.sections = x;
    });
  }
}
