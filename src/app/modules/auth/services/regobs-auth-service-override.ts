import { JQueryRequestor, LocalStorageBackend, Requestor, StorageBackend } from "@openid/appauth";
import { AuthActionBuilder, AuthService, Browser, DefaultBrowser } from "ionic-appauth";

 /**
  * Class to wrap ionic-appauth AuthService to handle error coming from requestAccessToken when 
  * the user is coming from "Reset password flow". The error returned from /token endpoint contains AADB2C90090
  * and must be handled special.
  */
export class RegobsAuthServiceOverride extends AuthService {
 constructor(protected browser : Browser = new DefaultBrowser(),
      protected storage : StorageBackend = new LocalStorageBackend(),
      protected requestor : Requestor = new JQueryRequestor()) {
    super(browser, storage, requestor); 
 }

 protected async requestAccessToken(code : string, codeVerifier?: string) : Promise<void> {
   try{
     await super.requestAccessToken(code, codeVerifier);
   } catch (err) {
    if(err.error?.error_description?.indexOf('AADB2C90090') >= 0) {
      this.notifyActionListers(AuthActionBuilder.RefreshFailed(new Error('AADB2C90090'))); // Error in action listeners is only a string (toString)
      // and error_description is not included, so we have to pass this in as a custom Error.
    }else{
      this.notifyActionListers(AuthActionBuilder.RefreshFailed(err));
    }
   }
 }
}