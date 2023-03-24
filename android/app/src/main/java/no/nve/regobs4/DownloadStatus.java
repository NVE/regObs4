package no.nve.regobs4;

import android.app.DownloadManager;

public class DownloadStatus {
  double progress;
  int status;
  int reason;

  DownloadStatus(double progress, int status, int reason) {
    this.progress = progress;
    this.status = status;
    this.reason = reason;
  }

  String getStatusAndReasonAsString() {
    String statusString = getStatusString();
    String reasonString = getReasonString();
    StringBuilder result = new StringBuilder();
    if (statusString != null) {
      result.append("Status: " + statusString);
    }
    if (reason != 0) {
      result.append(", reason: " + reasonString);
    }
    return result.toString();
  }

  String getStatusString() {
    // have tried to harmonize these with ProgressMonitor.Result
    switch (status) {
      case DownloadManager.STATUS_FAILED:
        return "ERROR";
      case DownloadManager.STATUS_SUCCESSFUL:
        return "SUCCESS";
      case DownloadManager.STATUS_PAUSED:
      case DownloadManager.STATUS_PENDING:
        return "PENDING";
      case DownloadManager.STATUS_RUNNING:
        return "WORK_IN_PROGRESS";
    }
    return null;
  }

  String getReasonString() {
    switch (reason) {
      case DownloadManager.ERROR_CANNOT_RESUME:
        return "CANNOT_RESUME";
      case DownloadManager.ERROR_DEVICE_NOT_FOUND:
        return "DEVICE_NOT_FOUND";
      case DownloadManager.ERROR_FILE_ALREADY_EXISTS:
        return "FILE_ALREADY_EXISTS";
      case DownloadManager.ERROR_FILE_ERROR:
        return "FILE_ERROR";
      case DownloadManager.ERROR_HTTP_DATA_ERROR:
        return "HTTP_DATA_ERROR";
      case DownloadManager.ERROR_INSUFFICIENT_SPACE:
        return "INSUFFICIENT_SPACE";
      case DownloadManager.ERROR_TOO_MANY_REDIRECTS:
        return "TOO_MANY_REDIRECTS";
      case DownloadManager.ERROR_UNHANDLED_HTTP_CODE:
        return "UNHANDLED_HTTP_CODE";
      case DownloadManager.ERROR_UNKNOWN:
        return "UNKNOWN";
      case DownloadManager.PAUSED_WAITING_FOR_NETWORK:;
        return "WAITING_FOR_NETWORK";
      case DownloadManager.PAUSED_QUEUED_FOR_WIFI:;
        return "QUEUED_FOR_WIFI";
      case DownloadManager.PAUSED_WAITING_TO_RETRY:;
        return "WAITING_TO_RETRY";
      case DownloadManager.PAUSED_UNKNOWN:
        return "UNKNOWN";
    }
    return "HTTP " + String.valueOf(reason);
  }
}
