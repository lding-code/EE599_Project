import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProbService } from '../prob.service';
import { Prob } from '../prob.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-prob-solve',
  templateUrl: './prob-solve.component.html',
  styleUrls: ['./prob-solve.component.css']
})

export class ProbSolveComponent implements OnInit {
  prob: Prob;
  probTitle = '';
  probDesc = '';
  code = '';
  private probId = '';
  private probInSub: Subscription;
  evaResult = '';
  private evaResultSub: Subscription;

  editorOptions = {theme: 'vs-light', language: 'cpp', fontSize: 15, fontFamily: 'cascadia_coderegular'};


  constructor(public probService: ProbService, private activatedRoute: ActivatedRoute) {}

  onSubmit(){
    this.prob.submit = this.code;
    console.log('angular: prob-solve: onSubmit: code submitted: ', this.prob.submit);
    this.probService.submit(this.prob);
    this.evaResultSub = this.probService.submitListener()
      .subscribe((submitResult: string) => {
        this.evaResult = submitResult;
        console.log('angular: prob-solve: onSubmit: Evaluation done: ', this.evaResult);
      });
  }


  OnInit(editor) {
    let line = editor.getPosition();
    console.log(line);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log('Solve.ngOnInit(): params: ', params);
      this.probId = params['id'];
      console.log('Solve.ngOnInit(): params[\'id\']: ', this.probId);
    });
    this.probService.getProbById(this.probId);
    this.probInSub = this.probService.getProbByIdUpdateListener()
      .subscribe((probIn: Prob) => {
        this.prob = probIn;
        this.probTitle = this.prob.title;
        this.probDesc = this.prob.desc;
        this.code = this.prob.starter;
        console.log('Solve.ngOnInit subscribe done: fetched problem: ', probIn);
      })
    console.log('Solve.ngOnInit method finished: fetched problem: ', this.prob);
  }
}
