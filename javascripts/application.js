//steroids.view.navigationBar.show("Myezplan");
/*
var button = new steroids.buttons.NavigationBarButton();
var button1 = new steroids.buttons.NavigationBarButton();
var button2 = new steroids.buttons.NavigationBarButton();
button.title = "MENU"
button1.title = "Privacy"
button2.title = "Terms of use"
button.onTap = function() {
    $("#menu_icon").click()
};

var leftButton = new steroids.buttons.NavigationBarButton();

leftButton.title = "Left"

steroids.on('ready', function() { 
  steroids.view.navigationBar.setButtons({
    left: [leftButton],
    right: [button],
    overrideBackButton: true
  }, {
    onSuccess: function() {
     // alert("Buttons set!");
    },
    onFailure: function() {
     // alert("Failed to set buttons.");
    }
	});
});
*/
// Menu buttons
//Buttons variables
var showContact = new steroids.views.WebView("contactus.html");
showContact.preload();
function openshowContact(){steroids.layers.push(showContact);}
var showPolicy = new steroids.views.WebView("privacypolicy.html");
var showTerms = new steroids.views.WebView("termsofuse.html");
//var showWorks = new steroids.views.WebView("howitworks.html");
var showAccount = new steroids.views.WebView("myaccount.html");
//Buttons preloads

//showPolicy.preload();
//showTerms.preload();
//showWorks.preload();
//showAccount.preload();
//Buttons open functions

function openshowPolicy(){steroids.layers.push(showPolicy);}
function openshowTerms(){steroids.layers.push(showTerms);}
function openshowWorks(){steroids.layers.push(showWorks);}
function openshowWorks(){steroids.layers.push(showAccount);}
