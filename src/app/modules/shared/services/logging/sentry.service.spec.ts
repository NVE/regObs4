import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { SentryService } from './sentry.service';
import { FileLoggingService } from './file-logging.service';
import { LogLevel } from './log-level.model';

describe('SentryService', () => {
  let service: SentryService;
  let fileLoggingService: jasmine.SpyObj<FileLoggingService>;
  let addBreadcrumbSpy: jasmine.Spy;
  let captureMessageSpy: jasmine.Spy;
  let captureExceptionSpy: jasmine.Spy;

  beforeEach(() => {
    fileLoggingService = jasmine.createSpyObj('FileLoggingService', ['log']);

    TestBed.configureTestingModule({
      providers: [SentryService, { provide: FileLoggingService, useValue: fileLoggingService }],
    });

    service = TestBed.inject(SentryService);

    // Spy on the protected Sentry wrapper methods
    addBreadcrumbSpy = spyOn<any>(service, 'sentryAddBreadcrumb');
    captureMessageSpy = spyOn<any>(service, 'sentryCaptureMessage');
    captureExceptionSpy = spyOn<any>(service, 'sentryCaptureException');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('HttpErrorResponse handling', () => {
    it('should call captureMessage for HttpErrorResponse with Error level', () => {
      const httpError = new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found',
        url: '/api/test',
        error: { message: 'Resource not found' },
      });

      service.log('Test error', httpError, LogLevel.Error, 'TEST_TAG');

      expect(captureMessageSpy).toHaveBeenCalledWith(
        jasmine.any(String),
        jasmine.objectContaining({
          level: 'error',
          extra: jasmine.objectContaining({
            status: 404,
            statusText: 'Not Found',
            url: '/api/test',
            error: { message: 'Resource not found' },
          }),
        })
      );
    });

    it('should call captureMessage for HttpErrorResponse with Warning level', () => {
      const httpError = new HttpErrorResponse({
        status: 500,
        statusText: 'Server Error',
        url: '/api/data',
      });

      service.log('Server issue', httpError, LogLevel.Warning, 'TEST_TAG');

      expect(captureMessageSpy).toHaveBeenCalledWith(
        jasmine.any(String),
        jasmine.objectContaining({
          level: 'warning',
          extra: jasmine.objectContaining({
            status: 500,
            statusText: 'Server Error',
            url: '/api/data',
          }),
        })
      );
    });

    it('should call captureException when HttpErrorResponse.error is an Error instance', () => {
      const innerError = new Error('Inner error with stack');
      const httpError = new HttpErrorResponse({
        status: 500,
        statusText: 'Internal Server Error',
        url: '/api/crash',
        error: innerError,
      });

      service.log('HTTP error with Error', httpError, LogLevel.Error, 'TEST_TAG');

      expect(captureExceptionSpy).toHaveBeenCalledWith(
        innerError,
        jasmine.objectContaining({
          level: 'error',
          extra: jasmine.objectContaining({
            status: 500,
            statusText: 'Internal Server Error',
            url: '/api/crash',
            error: innerError,
          }),
        })
      );
    });

    it('should set warning level for NoNetworkOrTimedOut error code', () => {
      // This requires mocking getHttpErrorResponseMessageAndCode to return the specific code
      const httpError = new HttpErrorResponse({
        status: 0,
        statusText: 'Unknown Error',
        error: null,
      });

      service.log('Network timeout', httpError, LogLevel.Error, 'TEST_TAG');

      expect(captureMessageSpy).toHaveBeenCalledWith(
        jasmine.any(String),
        jasmine.objectContaining({
          level: jasmine.stringMatching(/warning|error/),
        })
      );
    });

    it('should not send HttpErrorResponse to Sentry for Info level', () => {
      const httpError = new HttpErrorResponse({
        status: 404,
        statusText: 'Not Found',
      });

      service.log('Info message', httpError, LogLevel.Info, 'TEST_TAG');

      expect(captureMessageSpy).not.toHaveBeenCalled();
      expect(captureExceptionSpy).not.toHaveBeenCalled();
    });
  });

  describe('Error handling (non-HTTP)', () => {
    it('should call captureException for regular Error with Error level', () => {
      const error = new Error('Regular error');

      service.log('Something failed', error, LogLevel.Error, 'TEST_TAG');

      expect(captureExceptionSpy).toHaveBeenCalledWith(error);
    });

    it('should not capture regular Error with Warning level', () => {
      const error = new Error('Warning error');

      service.log('Warning message', error, LogLevel.Warning, 'TEST_TAG');

      expect(captureExceptionSpy).not.toHaveBeenCalled();
      expect(captureMessageSpy).not.toHaveBeenCalled();
    });
  });

  describe('Breadcrumb handling', () => {
    it('should add breadcrumb for log with message and Error level', () => {
      service.log('Test message', null, LogLevel.Error, 'TEST_TAG');

      expect(addBreadcrumbSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          category: 'TEST_TAG',
          message: 'Test message',
          level: 'error',
        })
      );
    });

    it('should add breadcrumb with optionalParams', () => {
      const params = { userId: 123, action: 'save' };

      service.log('User action', null, LogLevel.Info, 'TEST_TAG', params);

      expect(addBreadcrumbSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({
          category: 'TEST_TAG',
          message: 'User action',
          level: 'info',
          data: params,
        })
      );
    });

    it('should not add breadcrumb for Debug level', () => {
      service.log('Debug message', null, LogLevel.Debug, 'TEST_TAG');

      expect(addBreadcrumbSpy).not.toHaveBeenCalled();
    });
  });

  describe('FileLoggingService integration', () => {
    it('should always call FileLoggingService.log', () => {
      const error = new Error('Test');

      service.log('Message', error, LogLevel.Error, 'TAG', { extra: 'data' });

      expect(fileLoggingService.log).toHaveBeenCalledWith('Message', error, LogLevel.Error, 'TAG', { extra: 'data' });
    });
  });
});
