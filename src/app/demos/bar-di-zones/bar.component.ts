import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injector, NgZone, OnInit } from '@angular/core'
import { BarUnidadeConfig, BAR_UNIDADE_CONFIG } from './bar.config'
import { BarFactory, BarServices, BebidaService } from './bar.service'



@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  providers: [
    // { provide: BarServices, useClass: BarServices },
    {
      provide: BarServices, useFactory: BarFactory, // assim usa uma factory
      deps: [
        HttpClient, Injector
      ]
    },
    { provide: BebidaService, useExisting: BarServices },
  ]
})
export class BarComponent implements OnInit {

  Config: BarUnidadeConfig
  barBebida1: string
  dadosUnidade: string
  barBebida2: string

  constructor(private barServices: BarServices,
    @Inject(BAR_UNIDADE_CONFIG) private ApiConfig: BarUnidadeConfig,
    private bebidaService: BebidaService,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.barBebida1 = this.barServices.obterBebidas()
    this.Config = this.ApiConfig

    this.dadosUnidade = this.barServices.obterUnidade()

    this.barBebida2 = this.bebidaService.obterBebidas()

  } 
  public progress: number = 0
  public label: string

  processWithinAngularZone() {
    this.label = 'dentro'
    this.progress = 0
    this._incriseProgress(() => console.log('Finalizado por dentro!'))
  }

  processOutsideOfAngularZone() {
    this.label = 'fora'
    this.progress = 0
    this.ngZone.runOutsideAngular(() => {
      this._incriseProgress(() => {
        this.ngZone.run(() => {
          console.log('Finalizado fora!!')
        })
      })
    })
  }

  _incriseProgress(doneCallback: () => void) {
    this.progress += 1
    console.log(`Progresso atual: ${this.progress}%`)

    if (this.progress < 100) {
      window.setTimeout(() => this._incriseProgress(doneCallback), 10)
    } else {
      doneCallback();
    }
  }
}

