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
  resultado: string = "";
  input: string = "";
  input_atual: string = "";

  // Função que vai recerber os números escolhidos
  ButtonNum(num: string) {
    if (this.resultado.length > 0) {
      this.resultado = '';
    }
    if (this.input_atual.includes(')')) {
      return;
    }
    if (this.input_atual.length == 0) {
      if (num == '.' || num == '0') {
        return;
      }
    }
    if (num == '.') {
      if (this.input_atual.includes('.')) {
        return;
      }
    }
    this.input_atual += num;
  }
  
  // Função que vai receber os operadores escolhidos
  ButtonOperator(operator: string) {
    this.input += this.input_atual;
    if (this.resultado.length > 0) {
      this.input = this.resultado;
      this.resultado = '';
    }
    if (this.input[this.input.length - 1] == '+' || this.input[this.input.length - 1] == '-' || this.input[this.input.length - 1] == '*' || this.input[this.input.length - 1] == '/' || this.input.length == 0) {
      return;
    }
    this.input += operator;
    this.input_atual = '';
  }

  // Função que vai calcular a expressão
  ButtonEqual() {
    this.input += this.input_atual;
    this.resultado = eval(this.input).toFixed(2);
    this.input = '';
    this.input_atual = '';
    this.Verificar()
  }

  // Função que vai limpar o último índice do vetor
  ButtonClear() {
    if(this.resultado.length != 0){
    this.input_atual = this.resultado.substr(0, this.resultado.length - 1)
    this.resultado = '';
    return;
    }
    this.input_atual = this.input_atual.substr(0, this.input_atual.length - 1);
  }

  // Função que vai limpar o vetor
  ButtonAllClear() {
    this.input_atual = '';
    this.input = '';
    this.resultado = '';
  }

  // Função que vai inverter o último valor do vetor
  ButtonReverse() {
    if (this.input_atual.length != 0) {
      if (this.resultado.length == 0) {
        let num = Number(this.input_atual);
        this.input_atual = '(' + num * -1 + ")";
        this.Verificar()
        return;
      }
    }
    if (this.resultado.length != 0) {
      let num = Number(this.resultado);
      this.input_atual = num * -1 + "";
      this.resultado = '';
    }
    this.Verificar()
  }

  // Função que vai fazer a % funcionar
  ButtonPorcentagem() {
    if (this.input_atual.length != 0) {
      if (this.resultado.length == 0) {
        let num = Number(this.input_atual);
        this.input_atual = num / 100 + '*';
      }
    }
    if (this.resultado.length != 0) {
      let num = Number(this.resultado);
      this.input_atual = num / 100 + '*';
      this.resultado = '';
    }
    this.Verificar()
  }

  Verificar() {
    if (this.input_atual == '(NaN)' || this.input_atual == 'NaN*' || this.resultado == 'NaN') {
      this.input = '';
      this.input_atual = '';
      this.resultado = 'Expressão inválida!!!';
      setTimeout(() => {
        this.resultado = '';
      }, 1000)
    }
  }
}
