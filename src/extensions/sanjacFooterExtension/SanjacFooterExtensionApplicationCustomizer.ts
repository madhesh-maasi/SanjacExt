import { Log } from "@microsoft/sp-core-library";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";
import { Dialog } from "@microsoft/sp-dialog";
import "./Custom.scss";
// import Facebook from '../../FooterImg/Facebook.png'
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import * as strings from "SanjacFooterExtensionApplicationCustomizerStrings";

const LOG_SOURCE: string = "SanjacFooterExtensionApplicationCustomizer";
const facebook = require("../../FooterImg/Facebook.png");
const linkedIn = require("../../FooterImg/Linkedin.png");
const instagram = require("../../FooterImg/Instagram.png");
const twitter = require("../../FooterImg/twitter.png");
let ToastItem;
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISanjacFooterExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SanjacFooterExtensionApplicationCustomizer extends BaseApplicationCustomizer<ISanjacFooterExtensionApplicationCustomizerProperties> {
  private getListItems(): Promise<any[]> {

    // Getting the list items 
    const url = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Toast')/items?$select=Title,Message,Severity,StartDate,EndDate,Enabled,Created`;
  
    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
         
          return response.json();
        } else {
          console.log(`Error: ${response.status} - ${response.statusText}`);
          return [];
        }
      })
      .then((data: any) => {
        // ToastItem = data.value;
        // Storing the Toast item value in the allocated variable ToastItem
        ToastItem = data.value.filter(li=>new Date(li.StartDate) <= new Date() && new Date(li.EndDate) >= new Date() && li.Enabled)
        // ! Notification Banner 
        if(ToastItem.length > 0){
      let objToastItem = ToastItem[0]
      const parentContainer = document.querySelector("[data-automation-id='contentScrollRegion']");
      // Step 2: Create the new element
      const notificationBanner = document.createElement('div');
      // Step 3: Set attributes, content, or styles for the new element
      // notificationBanner.textContent = `<div><span class="cusNotifyTitle">${objToastItem.Title}</span> : <span class="cusNotifyMessage">${objToastItem.Message}</span></div>`;
      notificationBanner.textContent = `${objToastItem.Title} : ${objToastItem.Message}`;
      notificationBanner.classList.add('customNotifyBanner');
      notificationBanner.classList.add(objToastItem.Severity);
      // Step 4: Insert the new element at the top of the parent container
      parentContainer.insertBefore(notificationBanner, parentContainer.firstChild);
    }
    // ! Notification Banner 
        return data.value; 
      });
  }
   
  public onInit(): Promise<void> {
    this.getListItems()
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = "(No properties were provided.)";
    }
    
    // Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);
    var elements = document.getElementsByClassName("customFooterSection");
    while (elements.length > 0) {
      elements[0].remove();
    }
    
   
    const footerElement = document.createElement("div");
    footerElement.setAttribute("class","customFooterSection")
  // footerElement.innerHTML = "Your custom footer text goes here.";
  footerElement.innerHTML = `<div class='CustomFooter'>
      <div style='display:flex; gap:10px;'>
        <a href='https://www.instagram.com/sanjaccollege' target='_blank'>
        <img src='${instagram}'/>
        </a>
        <a href='https://www.linkedin.com/school/san-jacinto-college/' target='_blank'>
        <img src='${linkedIn}'/>
        </a>
        <a href='https://twitter.com/SanJacCollege' target='_blank'>
        <img src='${twitter}'/>

        </a>
        </div>
        <p style='color:white; font-weight:600'>An equal opportunity institution.</p>
        </div>`;
  // Append the footer element to the page

  const body = document.querySelector("[data-automation-id='contentScrollRegion'] > div");
  body.appendChild(footerElement);
  return Promise.resolve();
  }
}
 