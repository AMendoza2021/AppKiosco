import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers : [ApiService]
})
export class AppComponent {
  constructor( private apiSvc:ApiService) {}
  ngOnInit(){
    // this.apiSvc.getChecadas().subscribe((res)=>{
    //   console.log('Res',res);
    // })
  }
}
