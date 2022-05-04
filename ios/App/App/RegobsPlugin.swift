//
//  RegobsPlugin.swift
//  App
//
//  Created by Jørgen Loe Kvalberg on 29/04/2022.
//
//  The @objc decorators are required to make sure Capacitor’s runtime
//  (which must use Objective-C for dynamic plugin support) can see it.

import Foundation
import Capacitor


// Whenever you add or remove methods in RegobsPlugin.swift, RegobsPlugin.m must be updated.
@objc(RegobsPlugin)
public class RegobsPlugin: CAPPlugin {
    
    private let regobs = Regobs()
    
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        
        if let url = URL(string: value) {
            regobs.downloadFile(url: url)
        }
        
        
        call.resolve(["value": "'" + value + "' from NATIVE"])
    }
    
}
