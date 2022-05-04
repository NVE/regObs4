//
//  RegobsPlugin.m
//  App
//
//  Created by Jørgen Loe Kvalberg on 29/04/2022.
//
//  These Objective-C macros register the regobs plugin with Capacitor,
//  making RegobsPlugin and its echo methods available to JavaScript.
//  Whenever you add or remove methods in RegobsPlugin.swift, this file must be updated.

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(RegobsPlugin, "Regobs",
    CAP_PLUGIN_METHOD(echo, CAPPluginReturnPromise);
)
