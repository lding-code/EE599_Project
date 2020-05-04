import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { CodeEditorModule } from '@ngstack/code-editor';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';


import { Prob } from '../prob.model';
import { ProbService } from '../prob.service';

@Component({
  selector: 'app-prob-add',
  templateUrl: './prob-add.component.html',
  styleUrls: ['./prob-add.component.css']
})

export class ProbAddComponent {
  prob: Prob = {
    _id: null,
    title: null,
    desc: null,
    starter: null,
    tester: null,
    submit: null,
    tags: null,
    likes: 0,
    hates: 0
  };

  // initialize code in the three code editors
  starter = '#include <string>\n\nclass Solution {\npublic:\n    std::string HelloWorld() {\n        return "Hello World!";\n    }\n};';
  tester = '#include "gtest/gtest.h"\n#include "src/solution.h"\n\n#include <string>\n\nTEST(Should, Return) {\n    Solution solution;\n\n    std::string expected = "Hello World!";\n    std::string actual = solution.HelloWorld();\n\n    EXPECT_EQ(expected, actual);\n}';
  code = '#include <string>\n\nclass Solution {\npublic:\n    std::string HelloWorld() {\n        return "Hello World!";\n    }\n};';
  testResult = '';
  private testResultSub: Subscription;

  editorOptions = {theme: 'vs-light', language: 'cpp', fontSize: 15, fontFamily: 'cascadia_coderegular'};

  // initialize a service that listen and return values
  // initilize a router that switch between different components
  constructor(public probService: ProbService, private router: Router) {};

  // pass the entered code to backend and test it when test button is clicked
  onTest() {
    console.log('angular: prob-add: onTest: assign starter: ', this.starter);
    this.prob.starter = this.starter;
    console.log('angular: Prob-add: onTest: assign tester: ', this.tester);
    this.prob.tester = this.tester;
    this.prob.submit = this.code;
    this.probService.submit(this.prob);
    this.testResultSub = this.probService.submitListener()
      .subscribe((submitResult: string) => {
        this.testResult = submitResult;
        console.log('angular: prob-add: onTest: Evaluation done: ', this.testResult);
      });
  }

  // pass the problem to backend (and update database) when AddProb button is clicked
  onAddProb(form: NgForm) {
    console.log('angular: prob-add: onAddProb');
    if (form.invalid) {
      return;
    }
    console.log(form.value.title);
    console.log(form.value.desc);
    this.prob.title = form.value.title;
    this.prob.desc = form.value.desc;
    this.prob.starter = this.starter;
    this.prob.tester = this.tester;
    this.probService.addProb(this.prob);
    this.router.navigate(['/']);
  }

  // initialize code editor when the component is first initialized (drawn on page)
  OnInit(editor) {
    let line = editor.getPosition();
    console.log(line);
  }
}
