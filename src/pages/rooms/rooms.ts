import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import { Room } from '../../models/room';

@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {

  rooms:Array<Room> = [{
    name: 'Bed Room',
    lamps: [],
    img: 'Bedroom.jpg'
  }, 
  {
    name: 'Living Room',
    lamps: [],
    img: 'Livingroom.jpeg'
  }]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter RoomsPage');
  }

  addRoom(){
    this.navCtrl.push(AddRoomPage, {rooms:this.rooms});
  }

  goToRoom(room){
    this.navCtrl.push(HomePage, {room})
  }

}
