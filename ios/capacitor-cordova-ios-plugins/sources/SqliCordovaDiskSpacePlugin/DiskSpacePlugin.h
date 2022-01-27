#import <Cordova/CDV.h>

@interface DiskSpacePlugin : CDVPlugin

- (void)info:(CDVInvokedUrlCommand*)command;
-(NSUInteger)getDirectoryFileSize:(NSURL *)directoryUrl;

@end
