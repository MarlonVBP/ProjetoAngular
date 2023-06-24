import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink],
})
export class HomePage {
  resultado: string = "";
  input: string = "";

  ButtonNum(num: string){
  this.input += num;
  }

  ButtonOperator(operator: string){
  this.input += operator;
  }

  ButtonEqual(num: string){
  this.resultado = eval(num);
  }

  ButtonClear(){
  this.input = this.input.substr(0, this.input.length-1);
  }

  ButtonAllClear(){
  this.input = '';
  this.resultado ='';
  }
}
