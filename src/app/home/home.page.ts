import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 NoEmpleado_:string;
 password_:string;
  constructor(public api:ApiService, public toastController: ToastController, public router: Router) {}
  async ngOnInit() { 
    
    var date = new Date();
            //2021-09-30 15:46:03.097
        localStorage.removeItem("UsuarioLogin");
        this.api.Usuarios().subscribe(
          result => {  
            var Newdatos = [];
            var DatosLocalStorage = JSON.parse(localStorage.getItem("Usuarios")) || [];
            if(DatosLocalStorage.length >0){
              let exist = false;
              Newdatos = DatosLocalStorage;
            result.forEach(element => {          
                exist = false;
                DatosLocalStorage.forEach(elem => {
                    if(element.IDEMPLEADO == elem.IDEMPLEADO){
                      exist = true;
                    }
                });
                if(!exist){
                  Newdatos.push(element);
                }            
              });
              localStorage.setItem("Usuarios", JSON.stringify(Newdatos));  
            }  
            else{
              if(result.length > 0){
                localStorage.setItem("Usuarios", JSON.stringify(result));  
              }
            }              
            //localStorage.removeItem('Datos');
            // localStorage.setItem("Usuarios", JSON.stringify(result));  
            this.toastController.create({
              message: 'Conexion exitosa.',
              duration: 2000,
              color: 'success'              
            }).then((toastRes) => {       
              toastRes.present();
            });
          },
           err => {
            // Entra aquí si el servicio entrega un código http de error EJ: 404            
            this.toastController.create({
              message: 'Sin conexion con el servidor.',
              duration: 2000,
              color: 'danger'              
            }).then((toastRes) => {       
              toastRes.present();
            });
          }
        );      
        this.api.AllNoEmp().subscribe(
          result => {  
            var Newdatos = [];
            var NoEmp = [];
            var NoEmpLocalStorage = JSON.parse(localStorage.getItem("AllNoEmp")) || [];

            if(NoEmpLocalStorage.length >0){
              let exist = false;        
              Newdatos = NoEmpLocalStorage;
              result.forEach(element => {
                NoEmp.push(element);                  
              });
              
              NoEmp.forEach(element => {          
                exist = false;
                NoEmpLocalStorage.forEach(elem => {
                  if(element.NOEMPLEADO == elem.NOEMPLEADO){                    
                    exist = true;
                  }
                });
                if(!exist){
                  Newdatos.push(element);
                }            
              });
              
              localStorage.setItem("AllNoEmp", JSON.stringify(Newdatos));  
            }  
            else{
              if(result.length > 0){
                NoEmp = [];
                result.forEach(element => {
                  NoEmp.push(element);                  
                });
                localStorage.setItem("AllNoEmp", JSON.stringify(NoEmp));  
              }
            } 
          },
           err => {

          }
        );     
  }

  async Login(){    
    //Validar que ingrese numero de empleado
    if(this.NoEmpleado_ == undefined || this.NoEmpleado_ == ""){
      this.toastController.create({
        message: 'Ingresa Numero de empleado',
        duration: 2000,
        color: 'danger'   
      }).then((toastRes) => {       
        toastRes.present();
      });
      return;
    }
    else{
      //Validar que ingrese contraseña
      if(this.password_ == undefined || this.password_ == ""){
        this.toastController.create({
          message: 'Ingresa contraseña',
          duration: 2000,
          color: 'danger'
        }).then((toastRes) => {      
          toastRes.present();
        });
        return;
      }
      else{       
          this.api.Login(this.NoEmpleado_,this.password_).subscribe(
            result => {    
              if(result.ID >0 ){
                this.toastController.create({
                  message: 'Acceso Exitoso, Bienvenido '+result.NOMBRE+' '+result.APELLIDO ,
                  duration: 2000,
                  color: 'success'
                }).then((toastRes) => {      
                  toastRes.present();
                });                  
                localStorage.setItem("UsuarioLogin", JSON.stringify(result));
                this.router.navigate(['registro-checada']);
              }
              else{
                this.toastController.create({
                  message: 'Usuario y/o contraseña incorrecto',
                  duration: 2000,
                  color: 'warning'
                }).then((toastRes) => {      
                  toastRes.present();
                });
              }                         
            },
            err => {
              var DatosLocalStorage = JSON.parse(localStorage.getItem("Usuarios")) || [];
              let existe = false;
              var usuario ;
              DatosLocalStorage.forEach(element => {
                if(element.NOEMPLEADO == this.NoEmpleado_ && element.PASSWORD == this.password_) 
                  {
                    usuario = element;
                    existe = true;  
                  }
              });            
              if(existe){
                this.toastController.create({
                  message: 'Acceso Exitoso, Bienvenido '+usuario.NOMBRE+' '+usuario.APELLIDO ,
                  duration: 2000,
                  color: 'success'
                }).then((toastRes) => {      
                  toastRes.present();
                });             
                localStorage.setItem("UsuarioLogin", JSON.stringify(usuario));
                this.router.navigate(['registro-checada']);  
              }
              else{
                this.toastController.create({
                  message: 'Usuario y/o contraseña incorrecto',
                  duration: 2000,
                  color: 'warning'
                }).then((toastRes) => {      
                  toastRes.present();
                });
              }
            }
          );                 
      }
    }   
   }
   //Validar solo ingresar numeros 
   numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
}
