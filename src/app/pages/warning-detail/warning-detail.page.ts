import { Component, OnInit } from '@angular/core';
import { RegionSummary } from '../../core/services/warning/region-summary.model';
import { WarningService } from '../../core/services/warning/warning.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-warning-detail',
  templateUrl: './warning-detail.page.html',
  styleUrls: ['./warning-detail.page.scss'],
})
export class WarningDetailPage implements OnInit {
  regionSummary: RegionSummary;
  constructor(public activatedRoute: ActivatedRoute, private warningService: WarningService) { }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id'], 10);
    this.warningService.getWarningRegionSummaryAsObservable(id).subscribe((summary) => {
      if (summary.length > 0) {
        setTimeout(() => {
          this.regionSummary = summary[0];
        }, 0);
      }
    });
  }

}
