import { Component, OnInit } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';
// import do plugin
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: any[] = []; // array


  constructor(
    private ngxXml2jsonService: NgxXml2jsonService,
    private http: HTTP // inject service
  ) { }

  ngOnInit() {  // ciclo de vida do ionic
  }

  // método obter consulta XML do Via CEP
  consultar(cep: string) {

    const url = 'https://viacep.com.br/ws/' + cep + '/xml/'; // url de consulta

    this.http.get(url, {}, {})
      .then((result) => { // ok
        // console.log(result);
        const parser = new DOMParser(); // elementos DOM
        const xml = parser.parseFromString(result.data, 'text/xml');
        const obj = this.ngxXml2jsonService.xmlToJson(xml); // objeto JSON
        this.items.push(obj); // adicionei o conteúdo JSON ao array items
        console.log(obj);
      })
      .catch((error) => { // erro
        console.log(error);
      });
  }



}
