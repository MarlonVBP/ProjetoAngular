import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, CommonModule],
})
export class HomePage {
  resultado: string = "";
  input: string = "";
  operadores_vetor:string = '+-*/';

  ButtonNum(num: string) {
    if (this.resultado.length > 0) {
      this.resultado = '';
    }
    if (this.input.length == 0) {
      if (num == '.' || num == '0') {
        return;
      }
    }

    this.input += num;
  }

  ButtonOperator(operator: string) {
    if (this.resultado.length > 0) {
      this.input = this.resultado;
      this.resultado = '';
    }
    if (this.input[this.input.length - 1] == '+' || this.input[this.input.length - 1] == '-' || this.input[this.input.length - 1] == '*' || this.input[this.input.length - 1] == '/' || this.input.length == 0) {
      return;
    }
    this.input += operator;
  }

  ButtonEqual(num: string) {
    this.resultado = eval(num).toFixed(2);
    this.input = '';
  }

  ButtonClear() {
    this.input = this.input.substr(0, this.input.length - 1);
  }

  ButtonAllClear() {
    this.input = '';
    this.resultado = '';
  }

  ButtonReverse() {
    for (let i = 1; i != 0; i++) {
      if (this.operadores_vetor.includes(this.input[this.input.length-i])) {
      if (this.input[this.input.length-i] == '+') {
        this.input[this.input.length-i].replace('+', '-');
        console.log(this.input[this.input.length-i]); 
      }
      i = -1;
      }
    }
  }

  ButtonPorcentagem(){
    this.input += '/100*'
    // this.input += '%';
    // this.input = this.input.replace('%', '/100*');
  }
}
