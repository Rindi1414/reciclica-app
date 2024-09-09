import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class RegisterPageForm {
    private formBuilder: FormBuilder;
    private form: FormGroup;

    constructor(formBuilder: FormBuilder){
        this.formBuilder = formBuilder;
        this.form = this.createForm();
    }

    private createForm() : FormGroup {
        let form = this.formBuilder.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          repeatPassword: ['', Validators.required],
          phone: ['', Validators.required],
          address: this.formBuilder.group({
            street: ['', Validators.required],
            number: ['', Validators.required],
            neighborhood: ['', Validators.required],
            complement: [''],
            zipCode: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required]
          })
        });


        form.get('repeatPassword')?.setValidators(matcPasswordAndRepeatPassword(form))

        return form;
    }

    setAddress(place: any) {
        const addressForm = this.form.get('address');

        addressForm?.get('street')?.setValue(findStreet(place.address_component))
        addressForm?.get('number')?.setValue(findAddressNumber(place.address_component))
        addressForm?.get('neighborhood')?.setValue(findNeighborhood(place.address_component))
        addressForm?.get('zipcode')?.setValue(findZipCode(place.address_component))
        addressForm?.get('city')?.setValue(findCity(place.address_component))
        addressForm?.get('state')?.setValue(findState(place.address_component))
    }

    getForm() : FormGroup {
        return this.form;
    }
}

function matcPasswordAndRepeatPassword(form: FormGroup) : ValidatorFn {
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');

    const validator = () => {
        return password?.value == repeatPassword?.value ? null : {isntMatching: true}
    };

    return validator;

}

function findStreet(address_component: any): any {
    throw new Error("Function not implemented.");
}
function findAddressNumber(address_component: any): any {
    throw new Error("Function not implemented.");
}

function findNeighborhood(address_component: any): any {
    throw new Error("Function not implemented.");
}

function findZipCode(address_component: any): any {
    throw new Error("Function not implemented.");
}

function findState(address_component: any): any {
    throw new Error("Function not implemented.");
}

function findCity(address_component: any): any {
    throw new Error("Function not implemented.");
}
