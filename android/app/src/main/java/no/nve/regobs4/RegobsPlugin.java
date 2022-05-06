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
    private Map<Long, ProgressMonitor> progressPerFileRef = new HashMap();

    @PluginMethod()
    public void downloadAndUnzip(PluginCall call) {
        String downloadUrl = call.getString("downloadUrl");
        String destinationPath = call.getString("destinationPath");
        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(downloadUrl));
        request.setTitle("Downloading " + downloadUrl);  //set title for notification in status_bar
        request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);  //flag for if you want to show notification in status or not
        Context context = getContext();
        request.setDestinationInExternalFilesDir(context, Environment.DIRECTORY_DOWNLOADS, "test.zip");
        DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
        long downloadedFileId = downloadManager.enqueue(request);

        IntentFilter filter = new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
        BroadcastReceiver receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                long reference = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
                if (downloadedFileId == reference) {
                    openDownloadedAttachment(context, downloadedFileId, destinationPath, call);
                }
            }
        };
        context.registerReceiver(receiver, filter);

        JSObject ret = new JSObject();
        ret.put("fileReference", downloadedFileId);
        call.resolve(ret);
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        JSObject result = new JSObject();
        result.put("status", "UNKNOWN_FILEREF_MAYBE_STILL_DOWNLOADING?"); //TODO: Hva hvis vi ikke har startet å pakke ut?

        Integer fileRef = call.getInt("fileReference");
        if (fileRef != null) {
            ProgressMonitor progressMonitor = progressPerFileRef.get(fileRef.longValue());
            if (progressMonitor != null) {
                result.put("progress", progressMonitor.getPercentDone());
                if (progressMonitor.getResult() != null) {
                    result.put("status", progressMonitor.getResult().toString());
                }
            }
        }
        call.resolve(result);
    }

    @PluginMethod()
    public void echo(PluginCall call) {
        String downloadUrl = call.getString("downloadUrl");
        JSObject ret = new JSObject();
        ret.put("value", downloadUrl);
        call.resolve(ret);
    }

    private void openDownloadedAttachment(final Context context, final long downloadId, String destinationPath, PluginCall call) {
        DownloadManager downloadManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
        DownloadManager.Query query = new DownloadManager.Query();
        query.setFilterById(downloadId);
        Cursor cursor = downloadManager.query(query);
        if (cursor.moveToFirst()) {
            int downloadStatus = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS));
            String downloadLocalUri = cursor.getString(cursor.getColumnIndex(DownloadManager.COLUMN_LOCAL_URI));
            String downloadMimeType = cursor.getString(cursor.getColumnIndex(DownloadManager.COLUMN_MEDIA_TYPE));
            if ((downloadStatus == DownloadManager.STATUS_SUCCESSFUL) && downloadLocalUri != null) {
                Uri uri = Uri.parse(downloadLocalUri);
                String filename = uri.getLastPathSegment();
                unzipWithZip4j(uri.getPath(), destinationPath, downloadId, call);
            }
        }
        cursor.close();
    }

    private void unzipWithZip4j(String zipFilePath, String destinationPath, final long downloadId, PluginCall call) {
        ProgressMonitor progressMonitor = unzipper.unzipFile(zipFilePath, destinationPath, call);
        progressPerFileRef.put(downloadId, progressMonitor);
    }
}