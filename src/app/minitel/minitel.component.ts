import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { User } from '../shared/model/User.model';

@Component({
  selector: 'app-minitel',
  templateUrl: './minitel.component.html',
  styleUrls: ['./minitel.component.scss']
})
export class MinitelComponent implements OnInit {

  searching: boolean = true;

  welcomeMessage: string = "Bonjour ";

  textAreaMessage: string = "Entrez votre recherche : \n";

  @ViewChild('textArea') textArea: ElementRef;

  @Input() name : string = "name";

  lastSize = 0;

  constructor(private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
     // application
     var user: User = JSON.parse(localStorage.getItem("user")!);
     this.welcomeMessage += user.username + " ! Bienvenue sur votre Minitel";
      var speed = 50;
      await this.typeEffect(speed);
      await this.addWithEffect(this.textAreaMessage, speed);
      this.searching = false;
      this.lastSize = this.textArea.nativeElement.value.length
  }

  async typeEffect(speed: number) {
    var text = this.welcomeMessage;
    this.welcomeMessage = "";
    return await new Promise(resolve => {
      let i = 0;
      const interval = setInterval(() =>{
        if (i < text.length) {
          this.welcomeMessage += text.charAt(i);
          i++;
        }else{
          resolve('')
          clearInterval(interval);
        }
      }, speed);
    });
  }

  async addWithEffect(add:string, speed: number){
    return await new Promise(resolve => {
      let i = 0;
      const interval = setInterval(() =>{
        if (i < add.length) {
          this.textArea.nativeElement.value = this.textArea.nativeElement.value.concat(add.charAt(i));
          i++;
        }else{
          resolve('foo');
          clearInterval(interval);
        }
      }, speed)
    });
  }

  @HostListener('document:keypress', ['$event'])
  async handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === "Enter" && !this.searching){
      this.searching = true
      let searchUri = encodeURI(this.textArea.nativeElement.value.substring(this.lastSize));
      await this.addWithEffect('\nRecherche en cours ', 75);
      await this.addWithEffect('...', 700);
      var success = Math.random() < 0.75;
      if(success){
        this.textArea.nativeElement.value = this.textArea.nativeElement.value.concat('\n');
        this.makeSearch(searchUri);
      }else{
        this.textArea.nativeElement.value = this.textArea.nativeElement.value.slice(0, -3);
        await this.addWithEffect('...', 700);
        await this.addWithEffect('\n404 Not Found, Vérifiez votre connexion au réseau téléphonique \n', 50);
        await this.addWithEffect(this.textAreaMessage, 75);
      this.searching = false
      this.lastSize = this.textArea.nativeElement.value.length;
      }
    }
  }

  makeSearch(uri){
    let url: string = "https://www.google.com/search?q=" + uri
    this.textArea.nativeElement.value
    const dialogRef = this.dialog.open(SearchModalComponent, {data: {url},});
    dialogRef.afterClosed().subscribe(async ()=> {
      await this.addWithEffect(this.textAreaMessage, 75);
      this.searching = false
      this.lastSize = this.textArea.nativeElement.value.length;
    });
  }

}
