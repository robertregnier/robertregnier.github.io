var slideShowSpeed = 5000

// Duration of crossfade (seconds)
var crossFadeDuration = 3

// Specify the image files
var Pic = new Array() // don't touch this

var t;
var j = 0; 
var p ;
var onceFlag = true;

var preLoad  = new Array();
var newTitle = ""
var newDescr = "";
var newAlt = ""; 
var imgOnloadTxt = "";
var mainImgId = "mainImg";
var imgStyleTxt = "";
//
var albumType = "";

var currImg = "";

function viewNewPhoto(img)
{
	

//	thumbBoxObj = getEl('img_div_container');
	w = 800;
	h = 500;
	var imageWidth = img.width;
	var imageHeight = img.height;
	if ( imageHeight > h )
	{
		var k =  imageHeight / imageWidth;
		img.width = h / k ;
		img.height = h ;


	}
	else if (imageWidth > w)
	{
		var k =  imageWidth / imageHeight  ;
		img.width = w ;
		img.height = w / k;		
		
	}
	getEl('mainImg').parentNode.replaceChild(img , getEl('mainImg'));
	
	//getEl('fullPhoto').href = img.src;
	img.setAttribute('id', 'mainImg')
	
	changeLocButtons(j)
	if (albumType == "alternative")
	{
		viewShowWind();
	}
	currImg = img.src;
		try {
			getEl('photo').value = unescape(img.src);
				printComments();
		}catch(e) {}
}

	
function fillImgAray()
{
	imgDiv = document.getElementById('thumb_imgs');
	imgs = imgDiv.getElementsByTagName('img');
	if (Pic.length == 0)
		for (i=0; i<imgs.length; i++)
		{
			Pic[i] = imgs[i].src;
			//alert(Pic[i]);
		}
		
	p = Pic.length;

	if ( p == 0 )
	{
		if ( albumType != "alternative" )
			getEl('startSSButton').style.display = 'none';
		else
		{
			$("#startSSButtonMain").css("display", 'none');
			$("#startSSButtonMain").hide();
		}

		return;
	}
	loadPhotoData(0);
	writePhotoData();
	imgOnloadTxt = getEl('mainImg').getAttribute('onLoad');
	imgStyleTxt = getEl('mainImg').style.border;
	if (albumType != "alternative")
	{
		runSlideShow( false );
	}
}


function runSlideShow( once )
{
	if (once)
	{
		if (!onceFlag)
	   		j = j + 1;
		onceFlag = false;
   		if (j > (p-1)) j=0;
	}
	

	if ( p == 0 )
		return;
	if (!preLoad[j])
	{
   		preLoad[j] = new Image();
   		preLoad[j].src = Pic[j];
	}
	loadPhotoData(j);

	var newImg = document.createElement('img');
	newImg.style.border = imgStyleTxt;
	newImg.onload = function() {writePhotoData(); viewNewPhoto(this); }	
	newImg.setAttribute("src", preLoad[j].src.replace("thumb_", ""));
	newImg.style.maxHeight = "500px";
	newImg.style.maxWidth = "800px";

	if (once)
	{
		getEl('stopSSButton').style.display = "";
		getEl('startSSButton').style.display = "none";

		t = setTimeout('runSlideShow(true)', slideShowSpeed)
	}
}
function getEl(id)
{
	return document.getElementById(id);
}

function loadPhotoData(j)
{

	if ( false == (ael = getEl('aimg_'+ j)) )
		return;
	newTitle = ael.title;
	newAlt = arrayAlt[j];	
    newDescr = arrayDesc[j];
}

function writePhotoData()
{
	if ( newTitle == null )
		newTitle = "";
	if ( newDescr == null )			
		newDescr = "";
	if ( newAlt == null )
		newAlt = "";

	document.getElementById('photo_title').innerHTML = newTitle;
	document.getElementById('photo_desc').innerHTML  = newDescr;
	document.getElementById('mainImg').alt = newAlt;
}



function stopSlideShow()
{
	clearTimeout(t);
	getEl('stopSSButton').style.display = "none";
	getEl('startSSButton').style.display = "";
	
}

// SECOND VARIANT
//-----------------------------------------------------------------------------------------------
function fillImgAray2()
{

	albumType = "alternative";
	fillImgAray();
	windW = getWindowWidth();
	windH = getWindowHeight();
	$("#PR_overlay").height(windH);
	$("#PR_overlay").width("100%");
	$("#PR_overlay").hide();
	
	topPos = windW/2 - (850/2)
	$("#PR_window").css("left", topPos);
	$("#viewCloseBtn").show();
	
	$("a.thickbox").click(function(){
		goPhoto2(this.id.substring(5));

	return false;
	});
}
function goPhoto2(kuda)
{
	if (kuda == 'prev')
	{
		j--;
		if (j<0)
			j=0;
	}
	else if (kuda == 'next')
	{
		j++;
		if (j>p-1)
			j=p-1;
	}
	else if ( !isNaN(parseInt(kuda)) )
		j = parseInt(kuda)


//alert(kuda);
	changeLocButtons(j)		
	runSlideShow2( false );
	
}

function runSlideShow2( stat )
{
	runSlideShow( stat );
}
function viewShowWind()
{
	$("#PR_window").show()
	$("#PR_overlay").show()
	
}

function closeView()
{
	$("#PR_window").hide();
	$("#PR_overlay").hide();
	stopSlideShow();
	return false;
}

//----------------------------------------------------------------------------------------------------------------
function goPhoto(kuda)
{
	if (kuda == 'prev')
	{
		j--;
		if (j<0)
			j=0;
	}
	else if (kuda == 'next')
	{
		j++;
		if (j>p-1)
			j=p-1;
	}
	else if ( !isNaN(parseInt(kuda)) )
		j = parseInt(kuda)


	changeLocButtons(j)		
	runSlideShow( false );
	
}

function changeLocButtons(cImg)
{
	if (cImg == 0)
		setVisible('buttPrev', 'hidden');
	else
		setVisible('buttPrev', 'visible');
		
	
	if (cImg == p-1)
		setVisible('buttNext', 'hidden')
	else
		setVisible('buttNext', 'visible');
	
}

function setVisible(id, stat)
{
	getEl(id).style.visibility = stat;
}

function getWindowHeight()
{
        var windowHeight = 0;
        if (typeof(window.innerHeight) == 'number') {
                windowHeight = window.innerHeight;
        } else {
                if (document.documentElement && document.documentElement.clientHeight) {
                        windowHeight = document.documentElement.clientHeight;
                } else {
                        if (document.body && document.body.clientHeight) {
                                windowHeight = document.body.clientHeight;
                        }
                }
        }
        return( windowHeight );
}

function getWindowWidth()
{
	return window.innerWidth ? window.innerWidth : document.body.offsetWidth;
}
