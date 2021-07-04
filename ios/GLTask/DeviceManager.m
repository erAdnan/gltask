//
//  DeviceManager.m
//  RakBankTask
//
#import "DeviceManager.h"
#import <React/RCTLog.h>

@implementation DeviceManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getDeviceName:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    UIDevice *currentDevice = [UIDevice currentDevice];
    resolve(currentDevice.name);
}

@end
