import {Component,Inject} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Product} from "../model/product.model";
import {Model} from "../model/repository.model";
import {MODES,SharedState,SHARED_STATE} from "./sharedState.model";
import {Observable} from "rxjs";
import {filter,map,distinctUntilChanged,skipWhile} from "rxjs/operators";
import {ActivatedRoute,Router} from "@angular/router";


@Component({
    selector:"paForm",
    templateUrl:"form.component.html",
    styleUrls:["form.component.css"]
})

export class FormComponent{
    product: Product = new Product();
    // lastId:number;
    

    // constructor(private model:Model,@Inject(SHARED_STATE) private stateEvents: Observable<SharedState>){
    //     stateEvents
        // pipe(map(state => state.mode == MODES.EDIT ? state.id : -1))
        // .pipe(skipWhile(state => state.mode == MODES.EDIT))
        // .pipe(distinctUntilChanged((firstState,secondState)=> firstState.mode == secondState.mode && firstState.id == secondState.id))
        // .subscribe(update => {
        //     this.product = new Product();
        //     if(update.id != undefined){
        //         Object.assign(this.product,this.model.getProduct(update.id));
        //     }
        //     this.editing = update.mode == MODES.EDIT;
        // })
        editing: boolean = false;
        constructor(private model:Model,activeRoute:ActivatedRoute,private router:Router){

            activeRoute.params.subscribe(params => {
                console.log(`Params is ${params.mode}`);
                this.editing = params["mode"] == "edit";
                console.log(`${this.editing}`)
                let id = params["id"];
                if(id != null){
                    Object.assign(this.product,model.getProduct(id) || new Product());
                }
            })

            // this.editing = activeRoute.snapshot.params["mode"] == "edit";
            // console.log(`Editing is ${this.editing}`)
            
            // let id = activeRoute.snapshot.params["id"];
            // if(id != null){
                // let name = activeRoute.snapshot.params["name"];
                // let category = activeRoute.snapshot.params["category"];
                // let price = activeRoute.snapshot.params["price"];
                // if(name != null && category != null && price != null){
                //     this.product.id = id;
                //     this.product.name = name;
                //     this.product.category = category;
                //     this.product.price = Number.parseFloat(price);
                // }else{
                //     Object.assign(this.product,model.getProduct(id) || new Product());
                // }
                // debugger;
                // Object.assign(this.product,model.getProduct(id) || new Product());          
            // }
        }
        

    submitForm(form:NgForm){
        
        if(form.valid){
            this.model.saveProduct(this.product);
            // this.product = new Product();
            // form.reset();
            this.router.navigateByUrl("/");
        }
    }
    resetForm(){
        this.product = new Product();
    }
    // ngDoCheck(){
    //     if(this.lastId != this.state.id){
    //         this.product = new Product();
    //         if(this.state.mode == MODES.EDIT){
    //             Object.assign(this.product,this.model.getProduct(this.state.id))
    //         }
    //         this.lastId = this.state.id;
    //     }
    // }
}