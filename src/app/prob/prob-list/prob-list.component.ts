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

  onLike(prob: Prob) {
    console.log('prob likes before:', prob.likes);
    prob.likes++;
    console.log('prob likes after: ', prob.likes);
    this.probService.probLike(prob);
  }

  onHate(prob: Prob) {
    prob.hates++;
    this.probService.probHate(prob);
  }

  onSolve(probId: string) {
    console.log('Solve prob id: ', probId);
    console.log('Navigate path: /solve/' + probId);
    this.router.navigate(['/solve/' + probId]);
  }

  ngOnInit() {
    this.problist = this.probService.getProblist();
    this.problistSub = this.probService.getProblistUpdateListener()
      .subscribe((problist: Prob[]) => {
        this.problist = problist;
        console.log('ngOnInit subscribe done, fetched problem list: ', this.problist);
      });
    console.log('ngOnInit method finished, fetched problem list: ', this.problist);
  }

  ngOnDestroy() {
    this.problistSub.unsubscribe();
  }
}
