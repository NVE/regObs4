#import <Foundation/Foundation.h>

#import <Cordova/CDVPlugin.h>

@interface CordovaHttpPlugin : CDVPlugin

- (void)setServerTrustMode:(CDVInvokedUrlCommand*)command;
- (void)setClientAuthMode:(CDVInvokedUrlCommand*)command;
- (void)post:(CDVInvokedUrlCommand*)command;
- (void)put:(CDVInvokedUrlCommand*)command;
- (void)patch:(CDVInvokedUrlCommand*)command;
- (void)get:(CDVInvokedUrlCommand*)command;
- (void)delete:(CDVInvokedUrlCommand*)command;
- (void)head:(CDVInvokedUrlCommand*)command;
- (void)options:(CDVInvokedUrlCommand*)command;
- (void)uploadFiles:(CDVInvokedUrlCommand*)command;
- (void)downloadFile:(CDVInvokedUrlCommand*)command;
- (void)abort:(CDVInvokedUrlCommand*)command;

@end
