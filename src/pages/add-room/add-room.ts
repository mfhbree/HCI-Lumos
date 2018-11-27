import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Room } from '../../models/room';

@IonicPage()
@Component({
  selector: 'page-add-room',
  templateUrl: 'add-room.html',
})
export class AddRoomPage {
  rooms: Array<Room>;
  room: Room = {
    name: "",
    lamps: [],
    img: "Studyroom.jpg"
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.rooms = this.navParams.get('rooms');
  }

  confirm() {
    console.log(this.room)
    this.rooms.push(this.room)
    this.navCtrl.pop();
  }

  cancel(){
    this.navCtrl.pop();
  }

}
