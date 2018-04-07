import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { log } from 'util';

@Injectable()
export class ShoppingListService {

  private listItems: Array<any>;
  private listItemsRef: AngularFireList<any>;

  public listItemFirebase: Observable<any>;

  constructor(private httpClient: HttpClient, private db: AngularFireDatabase) {
    this.listItems = [];
    this.listItemsRef = this.db.list('items');

    this.listItemFirebase = this.listItemsRef.snapshotChanges().map(
      changes => {
        return changes.map(
          c => {

            console.log(c.payload.val());

            return {
              key: c.payload.key,
              name: c.payload.val()['name'],
              disabled: c.payload.val()['disabled']
            };
          }
        );
      }
    );
  }

  public add(item) {
    this.listItemsRef.push(item);
  }

  public remove(item) {
    this.listItemsRef.remove(item.key);
  }

  // remove all items
  public removeAll() {
    this.listItemsRef.remove();
  }


  public edit(item) {
    let key = item.key;
    delete item.key;
    this.listItemsRef.update(key, item);
  }

  public patch(item): Observable<Object> {
    let key = item.key;
    delete item.key;

    return this.httpClient.patch(`${environment.firebase.databaseURL}/items/${key}.json`, item)
  }
}
