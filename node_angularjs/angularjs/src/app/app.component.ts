import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpService } from './app.http.service';
import { MsgSession } from "./app.msgSession";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewChecked {
  title = 'pyChatUI';
  sendMsgForm;
  container: HTMLElement;

  reqMsg: string;
  respMsgs: MsgSession[];
  // $ suffix (popularized by Cycle.js) is used to indicate that the variable is an Observable.
  // It could make it to the official style guide too but it's not there yet

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    ) {
      this.sendMsgForm = this.formBuilder.group({
        reqMsg: '',
      });
  }

  getMsgFromService(reqMsg: string): void {
    this.httpService
    .getMsg(reqMsg)
    //.toPromise() //convert observable to promise
    .subscribe(respMsgs => this.respMsgs = respMsgs);
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.container = document.getElementById('msg_history_id');
    this.container.scrollTop = this.container.scrollHeight;
  }

  onSubmit(reqData: any) {
    console.log('Your msg has been submitted', reqData.reqMsg);
    this.reqMsg = reqData.reqMsg;
    this.getMsgFromService(this.reqMsg);
    console.log('debug: end --->');

    this.sendMsgForm.reset(); //reset form
  }

}
