// General variable
let tabs;
let tabContent;

// Tab 1 variable
let rtl = document.getElementById('rtl');
let rtr = document.getElementById('rtr');
let rbr = document.getElementById('rbr');
let rbl = document.getElementById('rbl');
let ttr = document.getElementById('ttr');
let ttl = document.getElementById('ttl');
let tbr = document.getElementById('tbr');
let tbl = document.getElementById('tbl');
let block = document.getElementById('block');
let outputcode = document.getElementById('outputcode');

// Tab 2 variable
let thinknes = document.getElementById('outlineThinknes');
let outline = document.getElementById('outline');
let color = document.getElementById('outlineColor');
let offset = document.getElementById('outlineOffset');
let block1 = document.getElementById('block1');
let outputcode1 = document.getElementById('outputcode1');

// Tab 3 variable
let overflowType = document.getElementById('overflowType');
let overflowValue = document.getElementById('overflowValue');
let block2 = document.getElementById('block2');
let outputcode2 = document.getElementById('outputcode2');

// General code
window.onload=function(){
    tabContent = document.getElementsByClassName('tabContent');
    tabs = document.getElementsByClassName('tab');
    hideTabsContent(1);
}

function hideTabsContent(a){
    for(let i = a; i < tabContent.length; i++){
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tabs[i].classList.remove('whiteborder');
    }
}

function showTabsContent(a){
    if(tabContent[a].classList.contains('hide')){
        hideTabsContent(0);
        tabContent[a].classList.add('show')
        tabs[a].classList.add('whiteborder');
        tabContent[a].classList.remove('hide');
    }
}

document.getElementById("tabs").onclick = function(event){
    let target = event.target;
    if(target.className == 'tab'){
        for(let i = 0; i < tabs.length; i++){
            if(target == tabs[i]){
                showTabsContent(i);
                break;
            }
        }
    }
}

function copyCode(outputcodeId) {
    let copyText = document.getElementById(outputcodeId);
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
}

// Tab 1 code
function generate(){
    ttr.value = rtr.value;
    ttl.value = rtl.value;
    tbr.value = rbr.value;
    tbl.value = rbl.value;
    block.style.borderRadius = rtl.value + "px " + rtr.value + "px " + rbr.value + 
    "px " + rbl.value + "px";
    outputcode.value = "border-radius: " + block.style.borderRadius + ";";
}

function change(){
    rtr.value = ttr.value;
    rtl.value = ttl.value;
    rbr.value = tbr.value;
    rbl.value = tbl.value;
    block.style.borderRadius = rtl.value + "px " + rtr.value + "px " + rbr.value + 
    "px " + rbl.value + "px";
    outputcode.value = "border-radius: " + block.style.borderRadius + ";";
}

// Tab 2 code
function changeOutline(){
    block1.style.outline = thinknes.value + "px " + outline.value + " " + color.value;
    block1.style.outlineOffset = offset.value + "px";
    outputcode1.value = "outline: " + thinknes.value + "px " + outline.value + 
    " " + color.value + ";\noutline-offset: " + offset.value + "px;";
}

// Tab 3 code
function changeOverflow(){
    if(overflowType.value == 'overflowX'){
        block2.style.overflowX = overflowValue.value;
    }else if(overflowType.value == 'overflowY'){
        block2.style.overflowY = overflowValue.value;
    }else{
        block2.style.overflow = overflowValue.value;
    }
    outputcode2.value = overflowType.value + ": " + overflowValue.value + ";"
}