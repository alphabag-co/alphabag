import { Customer } from './../../shared/interfaces/customer';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Observable<Customer[]>;
  constructor(public navCtrl: NavController, private afs: AngularFirestore) {
    const afCollection: AngularFirestoreCollection<
      Customer
    > = this.afs.collection<Customer>('customers');
    this.items = afCollection.valueChanges();
    console.log(afCollection);
    const customer: Customer = {};
    customer.name = 'ziopaperiono';
    const customers: Customer[] = [];
    customers.push(customer);
    afCollection.add(customer).then(customerRef => {
      console.log(customerRef.id);
    });
  }
}
