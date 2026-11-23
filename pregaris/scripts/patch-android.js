const fs=require('fs'),A='android/app/src/main/',J=A+'java/br/com/pregaris/';
let x=fs.readFileSync(A+'AndroidManifest.xml','utf8');
const d='<category android:name="android.intent.category.DEFAULT"/><category android:name="android.intent.category.BROWSABLE"/>';
const f=`<intent-filter><action android:name="android.intent.action.VIEW"/>${d}<data android:scheme="content"/><data android:scheme="file"/><data android:mimeType="application/pdf"/><data android:mimeType="application/vnd.openxmlformats-officedocument.wordprocessingml.document"/><data android:mimeType="application/msword"/></intent-filter><intent-filter><action android:name="android.intent.action.VIEW"/>${d}<data android:scheme="pregaris"/></intent-filter>`;
x=x.replace('</activity>',f+'</activity>').replace('<application','<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/><uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/><application android:requestLegacyExternalStorage="true"');
fs.writeFileSync(A+'AndroidManifest.xml',x);
fs.copyFileSync('native/PinPlugin.java',J+'PinPlugin.java');
fs.writeFileSync(J+'MainActivity.java','package br.com.pregaris;\nimport android.os.Bundle;\nimport com.getcapacitor.BridgeActivity;\npublic class MainActivity extends BridgeActivity {\n  @Override public void onCreate(Bundle b) { registerPlugin(PinPlugin.class); super.onCreate(b); }\n}\n');
const R=A+'res/';
for(const d of fs.readdirSync(R).filter(n=>n.startsWith('mipmap-'))){
  if(d==='mipmap-anydpi-v26'){fs.rmSync(R+d,{recursive:true});continue}
  for(const n of ['ic_launcher.png','ic_launcher_round.png','ic_launcher_foreground.png'])fs.rmSync(R+d+'/'+n,{force:true});
}
for(const n of ['ic_launcher.png','ic_launcher_round.png'])fs.copyFileSync('icon.png',R+'mipmap-xxxhdpi/'+n);
