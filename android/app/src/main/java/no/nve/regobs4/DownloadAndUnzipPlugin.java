package no.nve.regobs4;


import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.net.Uri;
import android.os.Environment;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import net.lingala.zip4j.progress.ProgressMonitor;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@CapacitorPlugin(name = "DownloadAndUnzip")
public class DownloadAndUnzipPlugin extends Plugin {

    private final Unzipper unzipper = new Unzipper();
    private Map<Long, ProgressMonitor> unzipProgressPerFileRef = new HashMap();
    private Set<Long> finishedJobs = new HashSet<>();

    @PluginMethod()
    public void downloadAndUnzip(PluginCall call) {
        try {
            String downloadUrl = call.getString("downloadUrl");
            String destinationPath = call.getString("destinationPath");
            DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downloadUrl));
            request.setTitle(getFilename(downloadUrl)); //set title for notification in status_bar
            request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE);  //flag for if you want to show notification in status or not
            final Context context = getContext();
            request.setDestinationInExternalFilesDir(context, Environment.DIRECTORY_DOWNLOADS, "no.nve.regobs");
            DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            long downloadedFileId = downloadManager.enqueue(request);

            IntentFilter filter = new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
            BroadcastReceiver receiver = new BroadcastReceiver() {
                @Override
                public void onReceive(Context context, Intent intent) {
                    try {
                        long reference = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
                        if (downloadedFileId == reference) {
                            handleDownloadedFile(context, downloadedFileId, destinationPath, call);
                        }
                    } catch (RuntimeException exception) {
                        call.reject(exception.getMessage(), exception);
                    }
                }
            };
            context.registerReceiver(receiver, filter);

            JSObject ret = new JSObject();
            ret.put("fileReference", downloadedFileId);
            call.resolve(ret);
        } catch (RuntimeException exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    private String getFilename(String url) {
        return url.substring(url.lastIndexOf('/')+1);
    }

    @PluginMethod
    public void getJobStatus(PluginCall call) {
        try {
            JSObject result = new JSObject();
            Integer fileRef = call.getInt("fileReference");
            if (fileRef != null) {
                if (finishedJobs.contains(fileRef.longValue())) {
                    result.put("progress", 1);
                    result.put("status", ProgressMonitor.Result.SUCCESS.toString());
                    result.put("task", "unzip");
                } else {
                    ProgressMonitor progressMonitor = unzipProgressPerFileRef.get(fileRef.longValue());
                    if (progressMonitor != null) {
                        //unzipping has started
                        result.put("progress", progressMonitor.getPercentDone() / 100);
                        result.put("task", "unzip");
                        if (progressMonitor.getResult() != null) {
                            result.put("status", progressMonitor.getResult().toString());
                        }
                        if (progressMonitor.getPercentDone() >= 100 && progressMonitor.getResult() != null && progressMonitor.getResult() == ProgressMonitor.Result.SUCCESS) {
                            finishedJobs.add(fileRef.longValue());
                            unzipProgressPerFileRef.remove(fileRef.longValue()); //do not track progress of finished jobs to free memory
                        }
                    } else {
                        //unzipping has not started so report download progress
                        final Context context = getContext();
                        double downloadProgress = this.getDownloadProgress(context, fileRef);
                        result.put("progress", downloadProgress);
                        result.put("task", "download");
                    }
                }
            }
            call.resolve(result);
        } catch (RuntimeException exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    @PluginMethod()
    public void cancelJob(PluginCall call) {
        try {
            Integer fileRef = call.getInt("fileReference");
            if (fileRef != null) {
                final Context context = getContext();
                DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
                downloadManager.remove(fileRef.longValue());
            }
            ProgressMonitor progressMonitor = unzipProgressPerFileRef.get(fileRef.longValue());
            if (progressMonitor != null) {
                progressMonitor.setCancelAllTasks(true);
                unzipProgressPerFileRef.remove(fileRef.longValue());
            }
            call.resolve();
        } catch (RuntimeException exception) {
            call.reject(exception.getMessage(), exception);
        }
    }

    private void handleDownloadedFile(final Context context, final long fileReference, String destinationPath, PluginCall call) {
        DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
        DownloadManager.Query query = new DownloadManager.Query();
        query.setFilterById(fileReference);
        Cursor cursor = downloadManager.query(query);
        try {
            if (cursor.moveToFirst()) {
                int downloadStatus = cursor.getInt(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_STATUS));
                String downloadLocalUri = cursor.getString(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_LOCAL_URI));
                if ((downloadStatus == DownloadManager.STATUS_SUCCESSFUL) && downloadLocalUri != null) {
                    Uri uri = Uri.parse(downloadLocalUri);
                    unzipWithZip4j(uri.getPath(), destinationPath, fileReference, call);
                }
            }
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }

    private double getDownloadProgress(final Context context, final long fileReference) {
        double progress = 0;
        DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
        DownloadManager.Query query = new DownloadManager.Query();
        query.setFilterById(fileReference);
        Cursor cursor = downloadManager.query(query);
        try {
            if (cursor.moveToFirst()) {
                int downloadedBytes = cursor.getInt(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
                int totalBytes = cursor.getInt(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
                progress = downloadedBytes / totalBytes;
            }
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
        return progress;
    }

    private void unzipWithZip4j(String zipFilePath, String destinationPath, final long fileReference, PluginCall call) {
        ProgressMonitor progressMonitor = unzipper.unzipFile(zipFilePath, destinationPath, call);
        unzipProgressPerFileRef.put(fileReference, progressMonitor);
    }
}