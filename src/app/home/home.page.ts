import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { isUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, CommonModule],
})
export class HomePage {
  // Nomeando as variáveis
  resultado: any = "";
  input: any = "";
  input_history: any = "";

  // Função que vai recerber os números escolhidos
  ButtonNum(num: string) {
    this.input_history = '';
    if (this.resultado.length > 0) {
      this.resultado = '';
    }
    if (this.input.length == 0) {
      if (num == '.' || num == '0') {
        return;
      }
    }
    if (this.input.length == 0) {
      if (num == '.' || num == '0') {
        return;
      }
    }
    if (this.input[this.input.length - 1] == ')') {
      return;
    }

    if (num == '.') {
      let operadores: any = /([+\-*/^()])/;
      this.input = this.input.split(operadores);
      if (this.input[this.input.length - 1].includes('.')) {
        this.input = this.input.join('');
        return;
      }
      this.input = this.input.join('');
    }
    this.input += num;
  }

  // Função que vai receber os operadores escolhidos
  ButtonOperator(operator: string) {
    this.input_history = '';
    if (this.resultado.length > 0) {
      this.input = this.resultado;
      this.resultado = '';
    }
    if (['+', '/', '*', '-'].includes(this.input[this.input.length - 1])) {
      return;
    }
    if (this.input.length == 0) {
      return;
    }
    this.input += operator;
  }

  // Função que vai calcular a expressão
  ButtonEqual() {
    this.resultado = (eval(this.input)).toString();
    console.log(this.resultado)
    if (this.resultado.includes('.')) {
      this.resultado = this.resultado.split('.');
      this.resultado[this.resultado.length - 2] += '.';
      if (this.resultado[this.resultado.length - 1].length > 0) {
        this.resultado = this.resultado.join('');
        this.resultado = (Number(this.resultado).toFixed(10)).toString();
        console.log(this.resultado)
        for (let i: any = 1; this.resultado[this.resultado.length - i] === '0'; i++) {
          this.resultado = (Number(this.resultado).toFixed(10 - i)).toString()
          console.log(this.resultado)
        }
        console.log(this.resultado)
        this.input_history = this.input;
        this.input = '';
        this.Verificar()
        return;
      }
      this.resultado = this.resultado.join('');
    }
    this.input_history = this.input;
    this.input = '';
    this.Verificar()
  }

  // Função que vai limpar o último índice do vetor
  ButtonClear() {
    this.input_history = '';
    if (this.resultado.length > 0) {
      this.input = this.resultado.substring(0, this.resultado.length - 1)
      this.resultado = '';
      return;
    }
    this.input = this.input.substring(0, this.input.length - 1);
  }

  // Função que vai limpar o vetor
  ButtonAllClear() {
    this.input = '';
    this.input_history = '';
    this.resultado = '';
  }

  // Função que vai inverter o último valor do vetor
  ButtonReverse() {
    this.input_history = '';
    if (this.input) {
      let operadores: any = /([+\-*/^()])/;
      this.input = this.input.split(operadores);
      if (['-', '+', '/', '*'].includes(this.input[this.input.length - 2]) && this.input[this.input.length - 1] == '') {
        this.input = this.input.join('');
        return;
      }
      if (this.input[this.input.length - 1] == '') {
        let elemento = this.input;
        elemento = elemento.filter((elemento: string) => elemento !== '');
        elemento = elemento.filter((elemento: string) => elemento !== ')');
        elemento = elemento.filter((elemento: string) => elemento !== '(');
        this.input = elemento;
      }
      if (this.input[this.input.length - 2] == '-') {
        if (this.input[this.input.length - 3] == '*' || this.input[this.input.length - 3] == '/') {
          this.input[this.input.length - 2] = ''
          this.input = this.input.join('');
          this.Verificar();
          return;
        }
        if (this.input.length == 2) {
          this.input[this.input.length - 2] = ''
          this.input = this.input.join('');
          this.Verificar();
          return;
        }
        this.input[this.input.length - 2] = '+'
        this.input = this.input.join('');
        return;
      }
      if (this.input[this.input.length - 2] == '+') {
        this.input[this.input.length - 2] = '-'
        this.input = this.input.join('');
        this.Verificar();
        return;
      }
      this.input[this.input.length - 1] = '(' + (this.input[this.input.length - 1] * -1).toString() + ')';
      this.input = this.input.join('');
      this.Verificar();
      return;
    }
    if (this.resultado) {
      ;
      let operadores: any = /([+\-*/^()])/;
      this.resultado = this.resultado.split(operadores);
      ;
      if (this.resultado.length == 3) {
        this.resultado[this.resultado.length - 2] = ''
        this.input = this.resultado.join('');
        this.resultado = '';
        this.Verificar();
        return;
      }
      this.input = '-' + this.resultado;
      this.resultado = '';
    }
  }

  // Função que vai fazer a % funcionar
  ButtonPorcentagem() {
    this.input_history = '';
    if (this.input) {
      let operadores: any = /([+\-*/^()])/;
      this.input = this.input.split(operadores);
      if (['-', '+', '/', '*'].includes(this.input[this.input.length - 2]) && this.input[this.input.length - 1] == '') {
        this.input = this.input.join('');
        this.Verificar();
        return;
      }
      if (this.input[this.input.length - 1] == '') {
        let elemento = this.input;
        elemento = elemento.filter((elemento: string) => elemento !== '');
        elemento = elemento.filter((elemento: string) => elemento !== ')');
        elemento = elemento.filter((elemento: string) => elemento !== '(');
        this.input = elemento;
      }
      if (this.input.length == 1 || this.input.length == 2) {
        this.input = this.input.join('');
        this.input = (this.input / 100).toString();
        this.Verificar();
        return;
      }
      if (this.input[this.input.length - 2].includes('-') || this.input[this.input.length - 2].includes('+')) {
        this.input[this.input.length - 1] = (this.input[this.input.length - 3] * this.input[this.input.length - 1] / 100).toString();
        this.input = this.input.join('');
        this.Verificar();
        return;
      }
      this.input[this.input.length - 1] = (this.input[this.input.length - 1] / 100).toString();
      this.input = this.input.join('');
    }
    if (this.resultado) {
      this.input = (this.resultado / 100).toString();
      this.resultado = '';
    }
    this.Verificar();
  }

  Verificar() {
    if (this.input.includes(['NaN']) || this.resultado == 'NaN') {
      this.input = '';
      this.input_history = '';
      this.resultado = '';
      setTimeout(() => {
        this.resultado = 'Expressão inválida!!!';
      }, 800)
      this.resultado = 'Bugs Existem 😭';
      setTimeout(() => {
        this.resultado = '';
        this.input_history = 'Me teste NOVAMENTE!!!';
      }, 1800)
    }
  }
}
