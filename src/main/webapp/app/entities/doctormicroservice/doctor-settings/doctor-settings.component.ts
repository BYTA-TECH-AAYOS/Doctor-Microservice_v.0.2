import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IDoctorSettings } from 'app/shared/model/doctormicroservice/doctor-settings.model';
import { Principal } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { DoctorSettingsService } from './doctor-settings.service';

@Component({
  selector: 'jhi-doctor-settings',
  templateUrl: './doctor-settings.component.html'
})
export class DoctorSettingsComponent implements OnInit, OnDestroy {
  currentAccount: any;
  doctorSettings: IDoctorSettings[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  currentSearch: string;
  routeData: any;
  links: any;
  totalItems: any;
  queryCount: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    private doctorSettingsService: DoctorSettingsService,
    private parseLinks: JhiParseLinks,
    private jhiAlertService: JhiAlertService,
    private principal: Principal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.doctorSettingsService
        .search({
          page: this.page - 1,
          query: this.currentSearch,
          size: this.itemsPerPage,
          sort: this.sort()
        })
        .subscribe(
          (res: HttpResponse<IDoctorSettings[]>) => this.paginateDoctorSettings(res.body, res.headers),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
      return;
    }
    this.doctorSettingsService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IDoctorSettings[]>) => this.paginateDoctorSettings(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/doctor-settings'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        search: this.currentSearch,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.currentSearch = '';
    this.router.navigate([
      '/doctor-settings',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.page = 0;
    this.currentSearch = query;
    this.router.navigate([
      '/doctor-settings',
      {
        search: this.currentSearch,
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.principal.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDoctorSettings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDoctorSettings) {
    return item.id;
  }

  registerChangeInDoctorSettings() {
    this.eventSubscriber = this.eventManager.subscribe('doctorSettingsListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  private paginateDoctorSettings(data: IDoctorSettings[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.queryCount = this.totalItems;
    this.doctorSettings = data;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
