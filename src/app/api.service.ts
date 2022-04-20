import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { observable, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //--proxy-config proxy.conf.json

  constructor(public http: HttpClient) { }


  Login(noEmpleado, password):Observable<any>{
    // var result = this.http.get<any>("https://localhost:44339/api/USUARIOSAPP?noEmp="+noEmpleado+"&&password="+password);
    // var result = this.http.get<any>("https://192.168.100.177:8082/backend/api/USUARIOSAPP?noEmp="+noEmpleado+"&&password="+password);
    var result = this.http.get<any>("https://192.168.100.1:8085/api/USUARIOSAPP?noEmp="+noEmpleado+"&&password="+password);
    return result
  }
  Usuarios():Observable<any>{

    
    var result = new Observable<any>();
    try {
      //  result = this.http.get<any>("https://localhost:44339/api/USUARIOSAPP");       
      //  result = this.http.get<any>("https://192.168.100.177:8082/backend/api/USUARIOSAPP");
      result = this.http.get<any>("https://192.168.100.1:8085/api/USUARIOSAPP");
    } catch (error) {
      result = new Observable<any>();
    }
    return result
  }  
  AllNoEmp():Observable<any>{
    var result = new Observable<any>();
    try {
      //  result = this.http.get<any>("https://localhost:44339/api/EMPLEADOes");
      // result = this.http.get<any>("https://192.168.100.177:8082/backend/api/EMPLEADOes");
      result = this.http.get<any>("https://192.168.100.1:8085/api/EMPLEADOes");
    } catch (error) {
      result = new Observable<any>();
    }
    return result
  }    
  RegistroChecada(noEmpleado,idAccion,activo,idUsuario,fecha):Observable<any>{
    var result = new Observable<any>();
    try {      
      var jsonSend = {
        "ID": 0,
        "NOEMPLEADO": parseInt(noEmpleado),
        "IDACCION": parseInt(idAccion),
        "ACTIVO": parseInt(activo),
        "IDUSUARIO": parseInt(idUsuario),
        "FECHA": fecha
    } 
  
      // result = this.http.post<any>("https://localhost:44339/api/REGISTRO_CHECADA",jsonSend);
      // result = this.http.post<any>("https://192.168.100.177:8082/backend/api/REGISTRO_CHECADA",jsonSend);
      result = this.http.post<any>("https://192.168.100.1:8085/api/REGISTRO_CHECADA",jsonSend);
    } catch (error) {
      result = new Observable<any>();
    }
    return result
  }

  RegistroAllChecada(json):Observable<any>{
    var result = new Observable<any>();
    try {     
      // result = this.http.post<any>("https://localhost:44339/api/REGISTRO_CHECADA?data="+JSON.stringify(json),JSON.stringify(json));
      // result = this.http.post<any>("https://192.168.100.177:8082/backend/api/REGISTRO_CHECADA?data="+JSON.stringify(json),JSON.stringify(json));
      result = this.http.post<any>("https://192.168.100.1:8085/api/REGISTRO_CHECADA?data="+JSON.stringify(json),JSON.stringify(json));
    } catch (error) {
      result = new Observable<any>();
    }
    return result
  }
   
  UserExist(noEmp):Observable<any>{
    // var result = this.http.get<any>("https://localhost:44339/api/EMPLEADOes?noEmp="+noEmp);
    // var result = this.http.get<any>("https://192.168.100.177:8082/backend/api/EMPLEADOes?noEmp="+noEmp);
    var result = this.http.get<any>("https://192.168.100.1:8085/api/EMPLEADOes?noEmp="+noEmp);
    return result
  } 

}
