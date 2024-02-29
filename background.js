browser.contextMenus.create({
  id: "kundennr-tab",
  title: "&1 Search text at Gusskiss",
  contexts: ["selection"]
});
 
browser.contextMenus.onClicked.addListener(async function (info, tab) {
  if (info.menuItemId == "kundennr-tab") {
      console.debug("menu clicked");
      let guskissurl = "https://kiss.gusbox.de/guskiss/";
    if (info.selectionText) {
      // https://kiss.gusbox.de/guskiss/?kdnr=5220019
      var selectedtext=info.selectionText.trim();
      //validation
      //always 9 digits, only numbers
      if (selectedtext.startsWith('GUS')){
        selectedtext=selectedtext.substring(3);
      }
      var re=new RegExp(/^$|^\d{7}$/)
      if(selectedtext.match(re)) {
        var searchtxt="?kdnr="+selectedtext;
        // encodeURIComponent(info.selectionText).replace("%20","+") +"/";
        var url = guskissurl + searchtxt;
        let newTab = await browser.tabs.create({ 'url': url });
      }
      else{
        console.log("ungültige kdnr: " + selectedtext);
      }
      
    }
  }
});
