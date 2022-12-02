import {Injectable} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';

@Injectable()

export class DeviceService {
  public deviceInfo = null;
  public deviceId = null;
  public deviceType = null;

  constructor(private deviceService: DeviceDetectorService) {
  }

  detectDevice() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.deviceType = this.deviceService.isDesktop() ? 'desktop' : this.deviceService.isMobile() ? 'mobile' : this.deviceService.isTablet() ? 'tablet' : 'unkown';
    this.deviceId = this.deviceService.isDesktop() ? 1 : this.deviceService.isMobile() ? 2 : this.deviceService.isTablet() ? 2 : 1;
  }

  lsTest() {
    const lsTest = 'lfa-test';

    try {
      window.localStorage;
      localStorage.setItem(lsTest, lsTest);
      localStorage.removeItem(lsTest);
      return true;
    } catch (e) {
      return false;
    }

  }

  ssTest() {
    const ssTest = 'lfa-test';

    try {
      window.sessionStorage;
      sessionStorage.setItem(ssTest, ssTest);
      sessionStorage.removeItem(ssTest);
      return true;
    } catch (e) {
      return false;
    }


  }
}
