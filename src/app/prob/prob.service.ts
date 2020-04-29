import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Prob } from './prob.model';
import { stringify } from 'querystring';

@Injectable({providedIn: 'root'})
export class ProbService {
  private problist: Prob[] = [];
  private problistUpdated = new Subject<Prob[]>();
  private probIn: Prob;
  private probInUpdated = new Subject<Prob>();
  private submitResult: string;
  private submitResultUpdated = new Subject<string>();

  constructor(private http: HttpClient) {}

  getProblist() {
    this.http.get<{message: string, problist: Prob[] }>(
      'http://localhost:3000/api/problist')
      .subscribe((newProbData) => {
        this.problist = newProbData.problist;
        this.problistUpdated.next([...this.problist]);
      });
    return this.problist;
  }

  getProblistUpdateListener() {
    return this.problistUpdated.asObservable();
  }

  getProbById(probId: string) {
    console.log('ProbService.getProbById probId:', probId);
    this.http.get<{message: string, prob: Prob}>(
      'http://localhost:3000/api/probsolve/' + probId)
      .subscribe((newProbData) => {
        this.probIn = newProbData.prob;
        this.probInUpdated.next(this.probIn);
      });
    //return this.probIn;
    // console.log('All problems: ', this.problist);
    // return this.problist[0];
  }

  getProbByIdUpdateListener() {
    return this.probInUpdated.asObservable();
  }

  addProb(prob: Prob) {
    this.http
      .post<{message: string, probId: string}>('http://localhost:3000/api/probadd', prob)
      .subscribe((responseData) => {
        console.log(responseData.message);
        const id = responseData.probId;
        prob._id = id;
        this.problist.push(prob);
        this.problistUpdated.next([...this.problist]);
      });
  }

  probLike(prob: Prob) {
    console.log('angular: service: probLike');
    this.http.patch<{message: string, probId: string}>
      ('http://localhost:3000/api/problist/like/' + prob._id, prob)
      .subscribe((responseData) => {
        console.log('angular: like update done: ', responseData.message);
        this.problistUpdated.next([...this.problist]);
      });
  }

  probHate(prob: Prob) {
    console.log('angular: service: probHate');
    this.http.patch<{message: string, probId: string}>
      ('http://localhost:3000/api/problist/hate/' + prob._id, prob)
      .subscribe((responseData) => {
        console.log('angular: hate update done: ', responseData.message);
        this.problistUpdated.next([...this.problist]);
      });
  }


  submit(prob: Prob) {
    console.log('angular: service: submit: received submit service request');
    this.http.post<{message: string}>
      ('http://localhost:3000/api/probsolve/', prob)
      .subscribe((responseData) => {
        this.submitResult = responseData.message;
        console.log('angular: service: submit: result from express', responseData.message);
        this.submitResultUpdated.next(this.submitResult);
      });
  }

  submitListener() {
    return this.submitResultUpdated.asObservable();
  }

}
