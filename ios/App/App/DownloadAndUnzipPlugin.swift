//
//  DownloadAndUnzipPlugin.swift
//  App
//
//  Created by Jørgen Loe Kvalberg on 29/04/2022.
//
//  The @objc decorators are required to make sure Capacitor’s runtime
//  (which must use Objective-C for dynamic plugin support) can see it.

import Foundation
import Capacitor


// Whenever you add or remove methods in DownloadAndUnzipPlugin.swift, DownloadAndUnzipPlugin.m must be updated.
@objc(DownloadAndUnzipPlugin)
public class DownloadAndUnzipPlugin: CAPPlugin {
    
    private let regobs = Regobs()
    
    @objc func downloadAndUnzip(_ call: CAPPluginCall) {
        let downloadUrl = call.getString("downloadUrl");
        let destinationPath = call.getString("destinationPath");

        if let url = URL(string: downloadUrl) {
            regobs.downloadFile(url: url)
        }
                
        call.reject(["value": "Denne virker ikke"])
    }

    @objc func cancelJob(_ call: CAPPluginCall) {
        let fileReference = call.getString("fileReference");               
        call.reject(["value": "cancelJob() virker ikke"])
    }

    @objc func getJobStatus(_ call: CAPPluginCall) {
        let fileReference = call.getString("fileReference");               
        call.reject(["value": "getJobStatus() virker ikke"])
    }
}
