import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {LessonDataService} from '../../../../../services/lessondata.service';
import {BookmarkService} from '../../../../../services/bookmark.service';
import {GlobalService} from '../../../../../services/global.service';
import {TicketService} from '../../../../../services/ticket.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input()
  activePage;
  @Input()
  activePageId;
  @Input()
  questionData;
  @Output()
  answered: EventEmitter<any> = new EventEmitter<any>();

  question;
  answers: Array<any> = [];
  selected;
  content: any;
  submitted: boolean = false;

  private questionContent = {
    content_type: 'choice',
    content_id: 0,
    category: 'question',
    attempt: 0,
    properties: {
      question: '',
      choices: [],
      score: '',
      user_selected: []
    }
  };

  constructor(private lessonDataService: LessonDataService
    , private bookmarkService: BookmarkService
    , private globalService: GlobalService
    , private ticketService: TicketService) {
  }

  ngOnInit() {
    this.getQuestionData();
  }

  getQuestionData() {

    if (this.questionData) {
      this.questionContent.content_id = this.questionData.question.id;
      this.question = this.questionData.question;
      this.answers = this.questionData.answers;

    } else if (this.activePage) {
      this.content = this.activePage.content;
      Object.keys(this.content).forEach(key => {

        console.log('item[key]: ', this.content[key]);

        if ('question' in this.content[key]) {
          console.log('Found Question: ', key);
          this.question = this.content[key].question;
        } else if ('answer' in this.content[key]) {
          console.log('Found Answer: ', key);
          this.answers.push(this.content[key].answer);
        }

      });
    }

    console.log('QUESTION: ', this.question);
    console.log('ANSWERS: ', this.answers);
    if (!this.question) {
      return;
    }
    if (this.question.code) {
      this.questionContent.category = this.question.code;
    }
    if (+this.question.random === 1 || this.question.randomize) {
      this.globalService.shuffle(this.answers);
    }
    console.log('this.content: ', this.content);

    if (this.ticketService.sessionData.pass_mark) {
      this.getAnswerData();
    }

  }

  getAnswerData() {

    this.bookmarkService.getAnswerData()
      .subscribe(
        (data) => {
          console.log('ANSWER DATA RECEIVED: ', data);
          for (let answer of data) {
            if (+answer.task_id === this.activePage.task_id) {
              console.log('ANSWER FOUND FOR THIS TASK: ', answer);
              this.questionContent.attempt = +answer.attempt + 1;
            }
          }
        },
        (err) => {
          if (err.status == 404) {
            console.log(err.message);
          } else {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> GET Answer ERROR: ', err);
          }
        }
      );

  }

  submitAnswer(chosen) {
    if (this.submitted) {
      return;
    }
    this.submitted = true;

    let task_id = this.lessonDataService.dataLoaded[this.lessonDataService.activePageId].task_id;
    // let status = this.bookmarkService.sessionBookmarks.filter(
    //   bookmark => bookmark.task_id === task_id);

    let answers = this.answers.map(answer => ({
        choice: answer.text,
        choice_id: answer.score
      })
    );

    let user_choice = {
      choice: chosen.text,
      choice_id: chosen.score
    };

    this.questionContent.properties.question = this.question.text;
    this.questionContent.properties.choices = answers,
      //this.questionContent.properties.chosen = chosen
      this.questionContent.properties.user_selected.push(user_choice),
      this.questionContent.properties.score = chosen.score;

    console.warn('dataLoaded: ', this.lessonDataService.dataLoaded);
    this.bookmarkService.pushBookmarkContent(this.questionContent);
    this.submitted = true;

    if (this.activePage) {
      this.bookmarkService.writeBookmark(task_id);
    } else {
      this.answered.emit(chosen);
    }
  }

  selectAnswer(event) {
    if (this.submitted) {
      return;
    }

    if (this.selected !== event) {
      this.selected = event;
    } else {
      this.selected = -1;
    }
    console.log('SELECTED ANSWER: ', event);
  }

}
