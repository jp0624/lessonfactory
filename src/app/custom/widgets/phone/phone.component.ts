import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {
  @Output()
  numberEntered: EventEmitter<number> = new EventEmitter<number>();

  public timerStarted;
  public phoneNumber: any = '8456259917';
  public phoneNumberEntered = [];
  public complete;

  public num0activeState;
  public num1activeState;
  public num2activeState;
  public num3activeState;
  public num4activeState;
  public num5activeState;
  public num6activeState;
  public num7activeState;
  public num8activeState;
  public num9activeState;

  public numstaractiveState;
  public numpoundactiveState;

  public numcallactiveState;
  public numdelactiveState;
  public numvoiceactiveState;

  constructor(public globalService: GlobalService) {
  }

  ngOnInit() {
    this.resetPhone();
  }

  resetPhone() {
    this.phoneNumberEntered = [];
    this.phoneNumber = '' + Math.floor(Math.random() * 9000000000 + 1000000000);

    console.log('PHONE NUMBER: ', this.phoneNumber);
    this.phoneNumber = this.phoneNumber.split('');

  }

  emitNumberEntered(value) {
    this.numberEntered.emit(value);
  }

  checkVal(num) {
    console.log('num: ', num);
    if (+this.phoneNumber[this.phoneNumberEntered.length] === +num) {
      this.phoneNumberEntered.push(+num);
    }
    if (this.phoneNumber.length === this.phoneNumberEntered.length) {
      this.emitNumberEntered(true);
      console.log('DONE!');
    }
    console.log('this.phoneNumber[this.phoneNumberEntered.length]: ', this.phoneNumber[this.phoneNumberEntered.length]);
    console.log('this.phoneNumberEntered: ', this.phoneNumberEntered);

  }
}
