import { Component, OnInit } from '@angular/core';
import { BackendService } from './services/backend.service';
import { articleTypeEnum as ART_TYPE, postTypeEnum as POST_TYPE, categoryTypeEnum, postTypeEnum, IPost, IMedia, IVideo, IGallery, articleTypeEnum, IArticle, IAuthor, IImage } from './interfaces';
import { map } from 'rxjs/operators';
import { isBoolean } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./_app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private backend: BackendService) {
  }
  ngOnInit() {
  }
}