import { Injectable } from '@angular/core';
import { articleTypeEnum as ART_TYPE, postTypeEnum as POST_TYPE, entitiesEnum, categoryTypeTypes, ICategory, IArticle, IPost } from '../interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of, interval, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { docJoin, leftJoin, leftJoinDocument } from './joins.util';
import { shareReplay, map, delay, mergeAll, mergeMap, tap, throttle, concatAll, takeUntil, filter } from 'rxjs/operators';
import { countries } from './data';

type colRef = firebase.firestore.CollectionReference;
type queryType = (ref: firebase.firestore.CollectionReference) => firebase.firestore.Query;

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  LIST_SIZE = 100;
  constructor(private db: AngularFirestore) { }

  queryPostType(postType): queryType {
    return (ref: firebase.firestore.CollectionReference) => ref
      .where('postType', '==', postType)
      .limit(this.LIST_SIZE)
  }

  queryArticleType(articleType): queryType {
    return (ref: firebase.firestore.CollectionReference) => ref
      .where('articleType', '==', articleType)
      .limit(this.LIST_SIZE)
  }

  queryCategoryType(categoryType): queryType {
    return (ref: firebase.firestore.CollectionReference) => ref
      .where('categoryType', '==', categoryType)
      .limit(this.LIST_SIZE)
  }

  posts$<T>(postType: T, query?: queryType): Observable<IPost<T>[]> {
    query = query ? query : this.queryPostType(postType)
    return this.db.collection<IPost<T>>(entitiesEnum.posts, query).valueChanges();
  }

  articles$<T>(articleType: T, query?: queryType): Observable<IArticle<T>[]> {
    query = query ? query : this.queryArticleType(articleType)
    return this.db.collection<IArticle<T>>(entitiesEnum.posts, query).valueChanges();
  }

  categories$<P>(categoryType: categoryTypeTypes, query?: queryType): Observable<ICategory<typeof categoryType, P>[]> {
    query = query ? query : this.queryCategoryType(categoryType)
    return this.db.collection<ICategory<typeof categoryType, P>>(entitiesEnum.categories, query).valueChanges();
  }

  // By Article Type
  news$ = (query? : queryType) => {
    return this.articles$<ART_TYPE.NEWS>(ART_TYPE.NEWS, query)
  };

  reports$ = (query? : queryType) => {
    return this.articles$<ART_TYPE.REPORT>(ART_TYPE.REPORT, query)
  };
  interviews$ = (query? : queryType) => {
    return this.articles$<ART_TYPE.INTERVIEW>(ART_TYPE.INTERVIEW, query)
  };
  articleArticles$ = (query? : queryType) => {
    return this.articles$<ART_TYPE.ARTICLE>(ART_TYPE.ARTICLE, query)
  };

  // By Post Type
  postArticles$ = (query? : queryType) => {
    return this.posts$<POST_TYPE.ARTICLE>(POST_TYPE.ARTICLE, query)
  };
  videos$ = (query? : queryType) => {
    return this.posts$<POST_TYPE.VIDEO>(POST_TYPE.VIDEO, query)
  };
  images$ = (query? : queryType) => {
    return this.posts$<POST_TYPE.IMAGE>(POST_TYPE.IMAGE, query)
  };
  galleries$ = (query? : queryType) => {
    return this.posts$<POST_TYPE.GALLERY>(POST_TYPE.GALLERY, query)
  };
  inforgraphics$ = (query? : queryType) => {
    return this.posts$<POST_TYPE.INFOGRAPHIC>(POST_TYPE.INFOGRAPHIC, query)
  };
  documents$ = (query? : queryType) => {
    return this.posts$<POST_TYPE.DOCUMENT>(POST_TYPE.DOCUMENT, query)
  };


  setDocuments<T>(collectionPath: string, key: string, data: T[]) {
    const index$ = interval(250);
    const data$ = of(data); // of(Object.values(data).map(c=>c));
    const completed$ = new Subject();
    return combineLatest(data$, index$)
      .pipe(
        map(([list, index]) => {
          return list[index];
        }),
        tap(notCompleted => {
          if (notCompleted) {
            console.log('Running : ', notCompleted[key])
          } else {
            console.log('Completed!');
            completed$.next();
          }
        }),
        mergeMap(item => {
          const docPath = `${collectionPath}/${item[key]}`;
          return this.db.doc(docPath).set(item)
        }),
        takeUntil(completed$)
      )
  }
}
