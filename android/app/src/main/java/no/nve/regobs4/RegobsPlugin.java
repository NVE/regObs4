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
import java.util.Map;

@CapacitorPlugin(name = "Regobs") //TODO: Endre navn
public class RegobsPlugin extends Plugin {

    private final Unzipper unzipper = new Unzipper();
    private Map<Long, ProgressMonitor> unzipProgressPerFileRef = new HashMap();

    @PluginMethod()
    public void downloadAndUnzip(PluginCall call) {
        String downloadUrl = call.getString("downloadUrl");
        String destinationPath = call.getString("destinationPath");
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downloadUrl));
        request.setTitle(getFilename(downloadUrl)); //set title for notification in status_bar
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);  //flag for if you want to show notification in status or not
        final Context context = getContext();
        request.setDestinationInExternalFilesDir(context, Environment.DIRECTORY_DOWNLOADS, "test.zip");
        DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
        long downloadedFileId = downloadManager.enqueue(request);

        IntentFilter filter = new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
        BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                long reference = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
                if (downloadedFileId == reference) {
                    handleDownloadedFile(context, downloadedFileId, destinationPath, call);
                }
            }
        };
        context.registerReceiver(receiver, filter);

        JSObject ret = new JSObject();
        ret.put("fileReference", downloadedFileId);
        call.resolve(ret);
    }

    private String getFilename(String url) {
        return url.substring(url.lastIndexOf('/')+1);
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        JSObject result = new JSObject();
        Integer fileRef = call.getInt("fileReference");
        if (fileRef != null) {
            ProgressMonitor progressMonitor = unzipProgressPerFileRef.get(fileRef.longValue());
            if (progressMonitor != null) {
                //unzipping has started
                result.put("progress", progressMonitor.getPercentDone() / 100);
                result.put("task", "unzip");
                if (progressMonitor.getResult() != null) {
                    result.put("status", progressMonitor.getResult().toString());
                }
            } else {
                //unzipping has not started so report download progress
                final Context context = getContext();
                double downloadProgress = this.getDownloadProgress(context, fileRef);
                result.put("progress", downloadProgress);
                result.put("task", "download");
            }
        }
        call.resolve(result);
    }

    @PluginMethod()
    public void cancel(PluginCall call) {
        Integer fileRef = call.getInt("fileReference");
        if (fileRef != null) {
            final Context context = getContext();
            DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
            downloadManager.remove(fileRef.longValue());
        }
        ProgressMonitor progressMonitor = unzipProgressPerFileRef.get(fileRef.longValue());
        if (progressMonitor != null) {
            progressMonitor.setCancelAllTasks(true);
        }
    }

    private void handleDownloadedFile(final Context context, final long fileReference, String destinationPath, PluginCall call) {
        DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
        DownloadManager.Query query = new DownloadManager.Query();
        query.setFilterById(fileReference);
        Cursor cursor = downloadManager.query(query);
        if (cursor.moveToFirst()) {
            int downloadStatus = cursor.getInt(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_STATUS));
            String downloadLocalUri = cursor.getString(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_LOCAL_URI));
            if ((downloadStatus == DownloadManager.STATUS_SUCCESSFUL) && downloadLocalUri != null) {
                Uri uri = Uri.parse(downloadLocalUri);
                unzipWithZip4j(uri.getPath(), destinationPath, fileReference, call);
            }
        }
        cursor.close();
    }

    private double getDownloadProgress(final Context context, final long fileReference) {
        double progress = 0;
        DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
        DownloadManager.Query query = new DownloadManager.Query();
        query.setFilterById(fileReference);
        Cursor cursor = downloadManager.query(query);
        if (cursor.moveToFirst()) {
            int downloadedBytes = cursor.getInt(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
            int totalBytes = cursor.getInt(cursor.getColumnIndexOrThrow(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
            progress = downloadedBytes / totalBytes;
        }
        cursor.close();
        return progress;
    }

    private void unzipWithZip4j(String zipFilePath, String destinationPath, final long fileReference, PluginCall call) {
        ProgressMonitor progressMonitor = unzipper.unzipFile(zipFilePath, destinationPath, call);
        unzipProgressPerFileRef.put(fileReference, progressMonitor);
        //TODO: Clean monitor from map when done to avoid memory leak
    }
}