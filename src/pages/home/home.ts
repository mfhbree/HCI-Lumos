import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Lamp } from '../../models/lamp';
import { Room } from '../../models/room';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isEditing: Boolean = false;
  selectedLamp: Lamp = new Lamp()
  room: Room = new Room()

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpProvider) {

  }

  ionViewDidLoad() {
    this.room = this.navParams.get('room');
  }

  touchstart(event){
    let add:HTMLElement = document.getElementById('add')
    if(!add) return;

    if (!this.isEditing) {
      add.style.display = 'inline';
      return;
    } else {
      add.style.display = 'none';
    }
    let square:HTMLElement = document.getElementById('exampleToggle')
    if(!square) return;
    square.style.left = (event.layerX-30)+'px'
    square.style.top = (event.layerY-20)+'px'
    square.style.display = 'inline';

    this.selectedLamp.x = event.layerX-30
    this.selectedLamp.y = event.layerY-20
    
    let buttons:HTMLElement = document.getElementById('buttons')
    if(!buttons) return;
    buttons.style.display = "inline";
    var nodes = buttons.childNodes;
    for(var i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'button') {
            nodes[i].style.display = 'inline';
        }
    }
  }

  cancel(){
    this.isEditing = false;
    let square:HTMLElement = document.getElementById('exampleToggle')
    if(!square) return;
    let buttons:HTMLElement = document.getElementById('buttons')
    if(!buttons) return;
    square.style.display = 'none';
    buttons.style.display = 'none';
    var nodes = buttons.childNodes;
    for(var i=0; i<nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'button') {
            nodes[i].style.display = 'none';
        }
    }
  }
  
  add() {
    let lamp:Lamp = new Lamp();
    lamp.id = this.room.lamps.length+1;
    lamp.isActive = false;
    lamp.x = this.selectedLamp.x;
    lamp.y = this.selectedLamp.y;
    this.room.lamps.push(lamp)
  }

  addLamps() {
    this.isEditing = true;
  }

  setStyle(lamp) {
    let style = {
      position: "absolute",
      top: lamp.y+'px',
      left: lamp.x+'px'
    }
    return style;
  }

  goHome(){
    this.navCtrl.pop();
  }

  lampsOn() {
    this.room.lamps.forEach(r => {
      r.isActive = !r.isActive;
      let uri = "/turn_on";
      if(!r.isActive) uri = "/turn_off";
      this.http.get(uri).subscribe((data)=>{});
    });
  }

  update(event, lamp){
    console.log(event)
    console.log(lamp)
    let uri = "/turn_on";
    if(!lamp.isActive) uri = "/turn_off";
    this.http.get(uri).subscribe((data)=>{console.log(data)});
  }

  changeColor(){
    let uri = "/rand_hue";
    this.http.get(uri).subscribe((data)=>{console.log(data)});
  }
}
