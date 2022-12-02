import {Component, OnInit} from '@angular/core';
import {ShellService} from '../../../services/shell.service';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements OnInit {

  constructor(public shellService: ShellService) {
  }

  ngOnInit() {
  }

}
