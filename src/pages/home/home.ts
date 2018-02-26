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
import {
  Geolocation,
  Geoposition,
  GeolocationOptions,
  PositionError
} from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Observable<Customer[]>;
  positions: Geoposition[] = [];
  constructor(
    public navCtrl: NavController,
    private afs: AngularFirestore,
    private geolocation: Geolocation
  ) {
    const options: GeolocationOptions = {
      maximumAge: 3000,
      timeout: 5000,
      enableHighAccuracy: true
    };
    /*this.geolocation
      .getCurrentPosition()
      .then((resp: Geoposition) => {
        // resp.coords.latitude
        // resp.coords.longitude
        console.log(resp);
      })
      .catch((error: PositionError) => {
        console.log('Error getting location', error);
      });*/

    const subscription = this.geolocation
      .watchPosition(options)
      .filter(p => {
        console.log(p);
        return p.coords !== undefined;
      }) //Filter Out Errors
      .subscribe(position => {
        this.positions.push(position);
      });

    const afCollection: AngularFirestoreCollection<
      Customer
    > = this.afs.collection<Customer>('customers');
    this.items = afCollection.valueChanges();
    console.log(afCollection);
    const customer: Customer = {};
    customer.name = 'ziopaperiono-test';
    const customers: Customer[] = [];
    // customers.push(customer);
    afCollection.add(customer).then(customerRef => {
      console.log(customerRef.id);
    });
  }
}
