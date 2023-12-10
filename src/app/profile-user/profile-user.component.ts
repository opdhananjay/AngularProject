import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/Models';



@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {


  userEmail: any;
  userProfileData: any;
  registrationForm1!: FormGroup<any>;
  age: any;
  user: User;


  updateRangeValue(event: any) {
    this.age = event.target.value;
  }


  ngOnInit() {

    setTimeout(() => {
      this.userService.getUsers(sessionStorage.getItem('UserEmail')).subscribe((userData) => {
        this.userProfileData = userData;
        sessionStorage.setItem("id", this.userProfileData[0].id)
   
      });

    }, 1000);
  }




  onFileSelected(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      const fileName = selectedFile.name || 'Unknown File';
      console.log('Selected File Name:', fileName);

      if (selectedFile) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const base64String: string = e.target.result;

          // Create an Image element to get the dimensions
          const img = new Image();
          img.src = base64String;

          // Set up an onload event for the image
          img.onload = () => {
            const width = img.width; // Width of the image in pixels
            const height = img.height; // Height of the image in pixels

            if (width <= 310 && height <= 325) {

              this.registrationForm1.patchValue({
                selectedFileBase64: base64String,
              });

            } else {
              alert('Image dimensions do not meet the specified criteria.it Should Less than 315X325');
              this.registrationForm1.patchValue({
                selectedFileBase64: ''
              });
            }
          };
        };

        reader.readAsDataURL(selectedFile);
      }
    }
  }




  constructor(private fb: FormBuilder, private userService: UserServiceService) {
    this.registrationForm1 = this.fb.group({

      firstName: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      hobbies: [''],
      selectedFileBase64: [''],
    });



    // Assuming you have user data available (this.userProfileData)
    this.userService.getUsers(sessionStorage.getItem('UserEmail')).subscribe((userData) => {
      this.userProfileData = userData;
      sessionStorage.setItem("id", this.userProfileData[0].id);

      // Set initial values for form controls
      this.registrationForm1.patchValue({
        firstName: this.userProfileData[0].firstName,
        lname: this.userProfileData[0].lname,
        email: this.userProfileData[0].email,
        phone: this.userProfileData[0].phone,
        age: this.userProfileData[0].age,
        gender: this.userProfileData[0].gender,
        hobbies: this.userProfileData[0].hobbies,
        selectedFileBase64: this.userProfileData[0].selectedFileBase64,
      });
    });
    this.user = {} as User;
  }



  //Update Profile button -- >>
  updateProfile() {
    this.userService.UpdateUser(this.registrationForm1.value, sessionStorage.getItem('id')).subscribe((data) => {
      console.log(data)
      sessionStorage.setItem("UserEmail", this.registrationForm1.get('email')?.value)
      window.location.reload()
    })
  }


}
