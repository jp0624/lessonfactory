import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookmarkService} from '../../../../../../services/bookmark.service';
import {GlobalService} from '../../../../../../services/global.service';
import {TicketService} from '../../../../../../services/ticket.service';

@Component({
  selector: 'app-essentialquestion',
  templateUrl: './essentialquestion.component.html',
  styleUrls: ['./essentialquestion.component.scss']
})
export class EssentialQuestionComponent implements OnInit { 
  @Input()
   questionData;
  @Input()
   linkedQuestions;
  @Input()
   essentialLinkedQuestions;
  @Input()
   essentialLoop;
  @Output()
   answered: EventEmitter<any> = new EventEmitter<any>();
  @Output()
   expressEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output()
   essentialEvent: EventEmitter<any> = new EventEmitter<any>();

  question;
  answers: Array<any> = [];
  selected;
  content: any;
  submitted: boolean = false;
  task_id : any;
  taskName : any;
  private iterate : any = 0;
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
  constructor(private bookmarkService: BookmarkService
    , private globalService: GlobalService
    , private ticketService: TicketService) {
  }

  ngOnInit() {
    if (this.linkedQuestions) 
       this.linkedQuestions = this.globalService.shuffle(this.linkedQuestions.split(','));       
    else 
        this.essentialLinkedQuestions = this.globalService.shuffle(this.essentialLinkedQuestions[this.essentialLoop].split(','));
    this.getQuestionData();
    if (localStorage.getItem('video-essentialbreak') && (!this.essentialLoop)) {
      let item = JSON.parse(localStorage.getItem('video-essentialbreak'))
      this.essentialLoop = item.loop;
    }     
    if (!this.essentialLoop) {
          this.essentialLoop = 0;
    } else {
       this.essentialLoop = this.essentialLoop;
    }
    //console.log('this.essentialLinkedQuestions in question page:',this.essentialLoop); 
  }

  getQuestionData() {
    this.question = '';
    this.answers = new Array();
    if (this.questionData) {
        let questionShuffle;
         if (this.linkedQuestions) 
           questionShuffle = this.linkedQuestions;       
         else 
           questionShuffle = this.essentialLinkedQuestions;         
            this.iterate = this.iterate + 1;
          if (this.iterate >= questionShuffle.length)
            this.iterate = 0;          
         let questionName = 'Question '+questionShuffle[this.iterate];      
         console.log('questionName=====================================>',questionName,'=============================================');  
         this.question = this.questionData.find( question => question.name === questionName );
        this.task_id =  this.question['task_id'];
        this.taskName = this.question['name'];
        this.content = this.question['content'];
        Object.keys(this.content).forEach(key => {
          //console.log('item[key]: ', this.content[key]);
          if ('question' in this.content[key]) {
            //console.log('Found Question: ', key);
            this.question = this.content[key].question;
          } else if ('answer' in this.content[key]) {
            //console.log('Found Answer: ', key);
           this.answers.push(this.content[key].answer);
          }
      });
    } 
    //console.log('QUESTION: ', this.question);
    //console.log('ANSWERS: ', this.answers);

    if (!this.question) {
      return;
    }
    
   // To shuffle the answer for quiz
    if (+this.question.random === 1 || this.question.randomize) {
      this.globalService.shuffle(this.answers);
    }

    if (this.ticketService.sessionData.pass_mark) {
      this.getAnswerData();
    }
  }

  getAnswerData() {
    this.bookmarkService.getAnswerData()
      .subscribe(
        (data) => {
          //console.log('ANSWER DATA RECEIVED: ', data);
          for (let answer of data) {
            if (+answer.task_id ===  this.task_id) {
              //console.log('ANSWER FOUND FOR THIS TASK: ', answer);
              this.questionContent.attempt = +answer.attempt + 1;
              break;
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
    // if (chosen.score == 100) {       
        if (this.question.code) {
          this.questionContent.category = this.question.code;
        }
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
        this.questionContent.properties.user_selected.push(user_choice),
        this.questionContent.properties.score = chosen.score;
      //}
      this.bookmarkService.writeEssentialBookmark(this.task_id, this.taskName, this.questionContent); 
    if (chosen.score == 0) {
      this.getQuestionData();
      this.selected = -1;
    } 
    if (chosen.score == 100) {
      if (this.linkedQuestions) {
       //this.bookmarkService.writeEssentialBookmark(this.task_id, this.taskName, this.questionContent);   
        this.expressEvent.emit(chosen.score);
      } else {
        this.essentialLoop = this.essentialLoop + 1;
       //this.bookmarkService.writeEssentialBookmark(this.task_id, this.taskName, this.questionContent);      
        this.essentialEvent.emit(this.essentialLoop);  
      }
    }
    }

  selectAnswer(event) {
    if (this.selected !== event) {
      this.selected = event;
    } else {
      this.selected = -1;
    }
    console.log('SELECTED ANSWER:==> ', event);
  }
}
