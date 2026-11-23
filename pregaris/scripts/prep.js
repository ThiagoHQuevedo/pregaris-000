const fs=require('fs');fs.mkdirSync('www/lib',{recursive:true});
const c=(a,b)=>fs.copyFileSync('node_modules/'+a,'www/lib/'+b);
c('pdfjs-dist/build/pdf.min.js','pdf.min.js');c('pdfjs-dist/build/pdf.worker.min.js','pdf.worker.min.js');c('mammoth/mammoth.browser.min.js','mammoth.js');
