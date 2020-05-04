import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Prob } from './prob.model';
import { stringify } from 'querystring';

// This is the data service that each component will initialize and call for data tramission
@Injectable({providedIn: 'root'})
export class ProbService {
  private problist: Prob[] = [];
  private problistUpdated = new Subject<Prob[]>();
  private probIn: Prob;
  private probInUpdated = new Subject<Prob>();
  private submitResult: string;
  private submitResultUpdated = new Subject<string>();

  constructor(private http: HttpClient) {}

  // get a problem list from backedn and send back to the componnent requesting it
  getProblist() {
    this.http.get<{message: string, problist: Prob[] }>(
      'http://localhost:3000/api/problist')
      .subscribe((newProbData) => {
        this.problist = newProbData.problist;
        this.problistUpdated.next([...this.problist]);
      });
    return this.problist;
  }

  // return the data listener as observable (data that can be used by component)
  // once the problem list is received
  getProblistUpdateListener() {
    return this.problistUpdated.asObservable();
  }

  // send the backend a problem id and get the problem info from backend
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

  // return the listener as observable onece the problem is received
  getProbByIdUpdateListener() {
    return this.probInUpdated.asObservable();
  }

  // send problem to backend to add to database
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

  // update the like count of the problem (asks backend to update the info on database)
  probLike(prob: Prob) {
    console.log('angular: service: probLike');
    this.http.patch<{message: string, probId: string}>
      ('http://localhost:3000/api/problist/like/' + prob._id, prob)
      .subscribe((responseData) => {
        console.log('angular: like update done: ', responseData.message);
        this.problistUpdated.next([...this.problist]);
      });
  }

  // update the hate count of the problem (asks backend to update the info on database)
  probHate(prob: Prob) {
    console.log('angular: service: probHate');
    this.http.patch<{message: string, probId: string}>
      ('http://localhost:3000/api/problist/hate/' + prob._id, prob)
      .subscribe((responseData) => {
        console.log('angular: hate update done: ', responseData.message);
        this.problistUpdated.next([...this.problist]);
      });
  }

  // submit code to backend and ask for evaluation result
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

  // return result listener as observable once the evaluation result is received by angula from the backend
  submitListener() {
    return this.submitResultUpdated.asObservable();
  }

}
