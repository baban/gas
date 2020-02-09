/**
 * 投票結果の集計
 */
function caliculate() {
  var sheet=SpreadsheetApp.getActiveSheet();

  // 結果の保存
  var result = {};
  result = caliculateRows(sheet, result);
  var arr = hashToTable(result);
  arr.sort(function(a,b){
    if(a[2] == b[2]) return 0;
    if(a[2] < b[2]) return 1;
    return -1;
  });  
  Browser.msgBox(tableToString(arr));
}


/**
 * 投票人数のカウント
 */
function countVokers(){
  var sheet=SpreadsheetApp.getActiveSheet();
  var vokers = [];
  for(var i=2; true; i++){
    var vokerName = sheet.getRange(i,2,i,3).getCell(1, 1).getValue();
    if(vokerName==""){
      break;
    }
    vokers.push(vokerName);
  }
  //Browser.msgBox(vokers);
  Browser.msgBox(uniq(vokers).length);
}

function uniq(array) {
  const knownElements = {};
  const uniquedArray = [];
  for (var i = 0, maxi = array.length; i < maxi; i++) {
    if (array[i] in knownElements)
      continue;
    uniquedArray.push(array[i]);
    knownElements[array[i]] = true;
  }
  return uniquedArray;
};

function tableToString(arr){
  var s = "";
  for(var i=0; i<arr.length; i++){
    var row = arr[i];
    s += row[0] + "," + row[1] + "," + row[2] + "\n";
  }
  return s;
}

function hashToTable(result){
  var arr = [];
  for(var creatorName in result){
    var creator = result[creatorName];    
    for(var workName in creator){
      if(!creator[workName]) continue;
      
      arr.push([creatorName,workName,creator[workName]]);
    }
  }
  
  return arr;
}

function caliculateRows(sheet, result){
  for(var i=2; true; i++){
    var vokerName = sheet.getRange(i,2,i,3).getCell(1, 1).getValue();
    if(vokerName==""){
      return result;
    }
    result = caliculateRow(sheet, i, result);
  }
}

function caliculateRow(sheet, rowNum, result){
  var cells = sheet.getRange(rowNum,3,rowNum,13);
  for(var i=0; i < 5; i+=1){
    var workName = cells.getCell(1, i*2 + 1).getValue();
    var creatorName = cells.getCell(1, i*2 + 2).getValue();
    if( workName=="" ) break;

    //Browser.msgBox(workName);
    
    if(!result[creatorName]){
      result[creatorName] = {};
    }
    if(!result[creatorName][workName]){
      result[creatorName][workName] = 0;
    }
    result[creatorName][workName] += 1;
  }
  
  return result;
}