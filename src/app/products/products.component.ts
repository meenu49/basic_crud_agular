import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Products } from '../products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  mobiles: Products[] = [];
  formHeader = 'add mobile';
  mobileName = null;
  price = null;
  ram = null;
  storage = null;
  showstatus = false;
  id = null;

  constructor(private _service: DataService) {}
  ngOnInit(): void {
    this.get_mobile_data();
  }

  get_mobile_data() {
    this._service.getproducts_data().subscribe((data) => (this.mobiles = data));
  }

  delete_mobile(id: number) {
    this._service
      .delete_mobiles(id)
      .subscribe((data) => this.get_mobile_data());
  }
  // add_mobile(s: string) {
  //   this.showstatus = true;
  //   this.formHeader = s[0].toUpperCase() + s.slice(1) + ' ' + 'Mobile';
  // }
  edit_mobile(data: any = {}) {
    this.showstatus = true;
    if (data) {
      console.log(data);
      this.mobileName = data.mobile;
      this.price = data.price;
      this.ram = data.ram;
      this.storage = data.storage;
      this.id = data.id;
      this.formHeader = 'Edit Mobile';
    } else {
      console.log(data);
      this.id = null;
      this.formHeader = 'Add Mobile';
    }
  }
  save() {
    this.showstatus = false;
    let body = {
      id: this.id,
      mobile: this.mobileName,
      price: this.price,
      ram: this.ram,
      storage: this.storage,
    };
    console.log(body);
    if (this.id) {
      body.id = this.id;
      // console.log(body.id, body);
      this._service.put_mobile(body).subscribe((res) => {
        this.get_mobile_data();
      });
    } else {
      // console.log(body.id, body);
      this._service.post_mobile(body).subscribe((res) => {
        this.get_mobile_data();
      });
    }
  }
  cancel() {
    this.showstatus = false;
    this.mobileName = null;
    this.price = null;
    this.ram = null;
    this.storage = null;
    this.id = null;
  }
}
