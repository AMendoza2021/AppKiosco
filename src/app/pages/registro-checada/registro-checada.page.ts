import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { ToastController } from '@ionic/angular';
import { concat, EMPTY } from 'rxjs';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro-checada',
  templateUrl: './registro-checada.page.html',
  styleUrls: ['./registro-checada.page.scss'],
})
export class RegistroChecadaPage implements OnInit {
  NoEmpleado_:string = "";
  items = [];
  constructor(public api:ApiService, public toastController: ToastController,public router: Router,public loadingController: LoadingController) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Enviando registros Locales',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 3000,
      message: 'No se encuentran registros locales',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  ngOnInit() {
    
    var DatosLocalStorage = JSON.parse(localStorage.getItem("UsuarioLogin")) || [];
    if(DatosLocalStorage.length == 0 )
      this.router.navigate(['home']); 
      
      this.InsertarRegistrosLocales();
  }
  InsertarRegistrosLocales(){
  var RegistroChecadas = JSON.parse(localStorage.getItem("RegistroChecadas")) || [];
      if(RegistroChecadas.length > 0 ){
        if(RegistroChecadas.length > 5){
          
          var sendArray = [];
          for (let index = 0; index < 5; index++) {
              sendArray.push(RegistroChecadas[index]);            
          }
          var newArray = RegistroChecadas.slice(5,RegistroChecadas.length);

          this.api.RegistroAllChecada(sendArray).subscribe(
            result => {   
              localStorage.setItem("RegistroChecadas", JSON.stringify(newArray)); 
            },
            err => {                    
            }
          );
        }
        else{
          this.api.RegistroAllChecada(RegistroChecadas).subscribe(
            result => {   
              localStorage.removeItem("RegistroChecadas");
            },
            err => {                    
            }
          );  
        }        
      }
}
SendRegistersLocal(){
  
  var RegistroChecadas = JSON.parse(localStorage.getItem("RegistroChecadas")) || [];
      if(RegistroChecadas.length > 0 ){
        this.presentLoading();
        this.InsertarRegistrosLocales();
      }
      else{        
        this.presentLoadingWithOptions();
      }  
}

  Logout(){
    localStorage.removeItem("UsuarioLogin");
    this.router.navigate(['home']);  
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  addNumber(number){
    if(this.NoEmpleado_.length <= 6){
      this.NoEmpleado_ = this.NoEmpleado_+""+number;
    }
    else{
      this.toastController.create({
        message: 'Alcanzó el tamaño máximo de dígitos.',
        duration: 2000,
        color: 'warning'              
      }).then((toastRes) => {       
        toastRes.present();
      });
    }
  }
  RemoveNumber(){
    this.NoEmpleado_ =  this.NoEmpleado_.substring(0, this.NoEmpleado_.length - 1);
  }
  ClearInput(){
    this.NoEmpleado_ = "";
  }
  PostChecada(idAccion){
    if(this.NoEmpleado_ != undefined && this.NoEmpleado_ != ""){
      var DatosLocalStorage = JSON.parse(localStorage.getItem("UsuarioLogin")) || [];
      var NoEmp = this.NoEmpleado_;
      var accion = "";
      var icon = "";
      var img = "";
            switch(idAccion){
              case 1:
                accion = "Entrada Laborar";
                img = "..\\assets\\img\\work.png";
                break;
                case 2:
                  accion = "Salida Laborar";
                  img = "..\\assets\\img\\work.png";
                break;
                case 3:
                  accion = "Salida Comer";
                  img = "..\\assets\\img\\food.png";
                break;
                case 4:
                  accion = "Regreso comer";
                  img = "..\\assets\\img\\food.png";
                break;
                case 5:
                  accion = "Salida Permiso";
                  img = "..\\assets\\img\\clock.png";
                break;
                case 6:
                  accion = "Regreso Permiso";
                  img = "..\\assets\\img\\clock.png";
                break;
                default:
                  break;
            }

      this.api.UserExist(this.NoEmpleado_).subscribe(
        result => {            
          var resultado = result;
          if(result.IDEMPLEADO > 0 ){            
            var date = new Date();
            var json = [];
            json.push({              
                "ID": 0,
                "NOEMPLEADO": parseInt(NoEmp),
                "IDACCION": parseInt(idAccion),
                "ACTIVO": true,
                "IDUSUARIO": parseInt(DatosLocalStorage.IDEMPLEADO),
                "FECHA": date.toLocaleString("sv-SE")            
            });
            this.api.RegistroAllChecada(json).subscribe(
              result => {  
                if(this.items.length <=1){
                  this.items.push({NoEmpleado : resultado.NOEMPLEADO,Nombre:  resultado.NOMBRE+' '+ resultado.APATERNO+' '+resultado.AMATERNO, acciones : accion, img_ : img});
                }
                else{
                  this.items.shift();
                  this.items.push({NoEmpleado : resultado.NOEMPLEADO,Nombre:  resultado.NOMBRE+' '+ resultado.APATERNO+' '+resultado.AMATERNO, acciones : accion, img_: img});
                }
                
                this.toastController.create({
                  message: 'Registro exitoso, '+resultado.NOMBRE+' '+ resultado.APATERNO+' '+resultado.AMATERNO,
                  duration: 2000,
                  color: 'success' 
                }).then((toastRes) => {      
                  toastRes.present();
                }); 
              },
              err => {                 
                var NoEmpLocalStorage = JSON.parse(localStorage.getItem("AllNoEmp")) || [];
                
                var exist =  false;
                var nombre = "";
                NoEmpLocalStorage.forEach(element => {
                  if(element.NOEMPLEADO == NoEmp){
                    exist = true;
                    nombre = element.NOMBRE+" "+ element.APATERNO+" "+element.AMATERNO;
                  }
                });

                  if(exist){
                    var date = new Date();
                    var jsonSaveLocal = {
                            "ID": 0,
                            "NOEMPLEADO": parseInt(NoEmp),
                            "IDACCION": parseInt(idAccion),
                            "ACTIVO": true,
                            "IDUSUARIO": parseInt(DatosLocalStorage.IDEMPLEADO),
                            "FECHA": date.toLocaleString("sv-SE")
                        }      
                    var RegistrosChecadas = JSON.parse(localStorage.getItem("RegistroChecadas")) || [];
                    RegistrosChecadas.push(jsonSaveLocal);
                    localStorage.setItem("RegistroChecadas", JSON.stringify(RegistrosChecadas)); 
                    
                    if(this.items.length <=1){
                      this.items.push({NoEmpleado : resultado.NOEMPLEADO,Nombre: nombre, acciones : accion, img_ : img});
                    }
                    else{
                      this.items.shift();
                      this.items.push({NoEmpleado : resultado.NOEMPLEADO,Nombre:  nombre, acciones : accion, img_ : img});
                    }      

                    this.toastController.create({
                      message: 'Registro almacenado localmente,'+nombre,
                      duration: 2000,
                      color: 'secondary' 
                    }).then((toastRes) => {      
                      toastRes.present();
                    }); 
                  }
                  else{
                    this.toastController.create({
                      message: 'Número de empleado no existente',
                      duration: 2000,
                      color: 'warning' 
                    }).then((toastRes) => {      
                      toastRes.present();
                    });
                  }           
              }
            );              
          }
          else{
            this.toastController.create({
              message: 'Número de empleado no existente',
              duration: 2000,
              color: 'warning' 
            }).then((toastRes) => {      
              toastRes.present();
            });
          }                                     
        },
        err => {
          var NoEmpLocalStorage = JSON.parse(localStorage.getItem("AllNoEmp")) || [];
          var exist =  false;
                var nombre = "";
                NoEmpLocalStorage.forEach(element => {
                  if(element.NOEMPLEADO == NoEmp){
                    exist = true;
                    nombre = element.NOMBRE+" "+ element.APATERNO+" "+element.AMATERNO;
                  }
                });

            if(exist){
              var date = new Date();
              var jsonSaveLocal = {
                      "ID": 0,
                      "NOEMPLEADO": parseInt(NoEmp),
                      "IDACCION": parseInt(idAccion),
                      "ACTIVO": true,
                      "IDUSUARIO": parseInt(DatosLocalStorage.IDEMPLEADO),
                      "FECHA": date.toLocaleString("sv-SE")
                  }      
              var RegistrosChecadas = JSON.parse(localStorage.getItem("RegistroChecadas")) || [];
              RegistrosChecadas.push(jsonSaveLocal);
              localStorage.setItem("RegistroChecadas", JSON.stringify(RegistrosChecadas));  

              if(this.items.length <=1){
                this.items.push({NoEmpleado : NoEmp,Nombre: nombre, acciones : accion,  img_ : img});
              }
              else{
                this.items.shift();
                this.items.push({NoEmpleado : NoEmp,Nombre:  nombre, acciones : accion,  img_ : img});
              }     

              this.toastController.create({
                message: 'Registro almacenado localmente',
                duration: 2000,
                color: 'secondary' 
              }).then((toastRes) => {      
                toastRes.present();
              });
            }
            else{
              this.toastController.create({
                message: 'Número de empleado no existente',
                duration: 4000,
                color: 'warning' 
              }).then((toastRes) => {      
                toastRes.present();
              });
            }          
        }
      );  
      this.NoEmpleado_ = "";
    }    
    else{
      this.toastController.create({
        message: 'Ingresa Numero de empleado',
        duration: 2000,
        color: 'warning'              
      }).then((toastRes) => {       
        toastRes.present();
      });
    }
  }
}
