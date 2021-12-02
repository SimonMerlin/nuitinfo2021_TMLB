import { Component, OnInit, Input } from '@angular/core';
import { User } from '../shared/model/User.model';

@Component({
  selector: 'app-minitel',
  templateUrl: './minitel.component.html',
  styleUrls: ['./minitel.component.scss']
})
export class MinitelComponent implements OnInit {

  welcomeMessage: string = "Bienvenue ! , ";

  @Input() name : string = "name";

  constructor() { }

  ngOnInit(): void {
     // application
     var user: User = JSON.parse(localStorage.getItem("user")!);
     this.welcomeMessage += user.username;
    var speed = 75;
    var delay = this.welcomeMessage.length * speed + speed;
    this.typeEffect(speed);

  }

  typeEffect(speed: number) {
    var text = this.welcomeMessage;
    this.welcomeMessage = "";

    var i = 0;
    var timer = setInterval(() =>{
      if (i < text.length) {
        this.welcomeMessage += text.charAt(i);
        i++;
      }
    }, speed);
  }


}
