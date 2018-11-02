import { Injectable } from '@angular/core';
import { articleTypeEnum as ART_TYPE, postTypeEnum as POST_TYPE, entitiesEnum, categoryTypeTypes, ICategory, IArticle, IPost } from '../interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, of, interval, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { docJoin, leftJoin, leftJoinDocument } from './joins.util';
import { shareReplay, map, delay, mergeAll, mergeMap, tap, throttle, concatAll, takeUntil, filter } from 'rxjs/operators';

type colRef = firebase.firestore.CollectionReference;
type queryType = (ref: firebase.firestore.CollectionReference) => firebase.firestore.Query;

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private db: AngularFirestore) { }
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
