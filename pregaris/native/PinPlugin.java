package br.com.pregaris;
import android.content.Intent;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.drawable.Icon;
import android.net.Uri;
import com.getcapacitor.*;
import com.getcapacitor.annotation.CapacitorPlugin;
@CapacitorPlugin(name = "Pin")
public class PinPlugin extends Plugin {
  @PluginMethod
  public void pin(PluginCall c) {
    String name = c.getString("name"), url = c.getString("url");
    ShortcutManager sm = getContext().getSystemService(ShortcutManager.class);
    if (sm == null || !sm.isRequestPinShortcutSupported()) { c.reject("unsupported"); return; }
    Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url), getContext(), MainActivity.class);
    ShortcutInfo s = new ShortcutInfo.Builder(getContext(), "pasta-" + name)
      .setShortLabel(name).setIcon(Icon.createWithResource(getContext(), R.mipmap.ic_launcher))
      .setIntent(i).build();
    sm.requestPinShortcut(s, null);
    c.resolve();
  }
}
