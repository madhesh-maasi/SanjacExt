import { Log } from "@microsoft/sp-core-library";
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
} from "@microsoft/sp-application-base";
import { Dialog } from "@microsoft/sp-dialog";
import "./Custom.scss";
// import Facebook from '../../FooterImg/Facebook.png'

const facebook = require("../../FooterImg/Facebook.png");
const linkedIn = require("../../FooterImg/Linkedin.png");
const instagram = require("../../FooterImg/Instagram.png");

import * as strings from "SanjacFooterExtensionApplicationCustomizerStrings";

const LOG_SOURCE: string = "SanjacFooterExtensionApplicationCustomizer";

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
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    let message: string = this.properties.testMessage;
    if (!message) {
      message = "(No properties were provided.)";
    }

    // Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);
    const footerElement = document.createElement("div");
  // footerElement.innerHTML = "Your custom footer text goes here.";
  footerElement.innerHTML = `<div class='CustomFooter'>
      <div style='display:flex; gap:10px;'>
        <a href='https://www.instagram.com/sanjaccollege' target='_blank'>
        <img src='${facebook}'/>
        </a>
        <a href='https://www.linkedin.com/school/san-jacinto-college/' target='_blank'>
        <img src='${linkedIn}'/>
        </a>
        <a href='https://twitter.com/SanJacCollege' target='_blank'>
        <img src='${instagram}'/>

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
 