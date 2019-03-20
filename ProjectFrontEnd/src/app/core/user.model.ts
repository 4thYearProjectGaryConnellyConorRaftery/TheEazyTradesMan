/**
 * This class creates a model for each user account on firebase authentication.
 */
export class FirebaseUserModel {
  image: string;
  name: string;
  provider: string;

  constructor(){
    this.image = "";
    this.name = "";
    this.provider = "";
  }
}
