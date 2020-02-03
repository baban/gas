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
  Browser.msgBox(arr);
}

function hashToTable(result){
  var arr = [];
  for(var creatorName in result){
    var creator = result[creatorName];    
    for(var workName in creator){
      if(!creator[workName]) continue;
      
      arr.push([creatorName,workName,creator[workName]]);
      //Browser.msgBox([creatorName,workName,creator[workName]]);      
    }
  }
  
  return arr;
}

function caliculateRows(sheet, result){
  var rowFlg = true;
  for(var i=2; rowFlg; i++){
    var o = caliculateRow(sheet, i, result);
    rowFlg = o.flg;
    result = o.result;
  }
  return result;
}

function caliculateRow(sheet, rowNum, result){
  var cells = sheet.getRange(rowNum,3,rowNum,13);
  for(var i=0; i < 5; i+=1){
    var workName = cells.getCell(1, i*2 + 1).getValue();
    var creatorName = cells.getCell(1, i*2 + 2).getValue();
    if( workName=="" && i==0 ) return { result: result, flg: false };
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
  
  return { result: result, flg: true };
}