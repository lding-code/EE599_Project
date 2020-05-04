import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Prob } from '../prob.model';
import { ProbService } from '../prob.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-prob-list',
  templateUrl: './prob-list.component.html',
  styleUrls: ['./prob-list.component.css']
})

export class ProbListComponent implements OnInit, OnDestroy {
  problist: Prob[] = [];
  private problistSub: Subscription;

  constructor(public probService: ProbService, private router: Router, private route: ActivatedRoute) {}

  // add like count and update the database when like is clicked
  onLike(prob: Prob) {
    console.log('prob likes before:', prob.likes);
    prob.likes++;
    console.log('prob likes after: ', prob.likes);
    this.probService.probLike(prob);
  }

  // add hate count and update the database when hate is clicked
  onHate(prob: Prob) {
    prob.hates++;
    this.probService.probHate(prob);
  }

  // navigate to problem solve view (prob-solve component) when solve button is clicked
  onSolve(probId: string) {
    console.log('Solve prob id: ', probId);
    console.log('Navigate path: /solve/' + probId);
    this.router.navigate(['/solve/' + probId]);
  }

  // subscribe to service and fetch problem list when the component is initialized
  ngOnInit() {
    this.problist = this.probService.getProblist();
    this.problistSub = this.probService.getProblistUpdateListener()
      .subscribe((problist: Prob[]) => {
        this.problist = problist;
        console.log('ngOnInit subscribe done, fetched problem list: ', this.problist);
      });
    console.log('ngOnInit method finished, fetched problem list: ', this.problist);
  }

  // unsubscribe service when the component is deleted
  ngOnDestroy() {
    this.problistSub.unsubscribe();
  }
}
