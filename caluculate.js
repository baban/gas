/**
 * 投票結果の集計
 */
function caliculate() {
  console.log("test");
  //Browser.msgBox("test");
  var sheet=SpreadsheetApp.getActiveSheet();

  // 結果の保存
  var result = {};

  var cells = sheet.getRange(2,3,2,13);
  for(var i=0; i < 5; i+=1){
    var workName = cells.getCell(1,i*2 + 1).getValue();
    var creatorName = cells.getCell(1,i*2 + 2).getValue();
    if( workName=="" ) break;

    Browser.msgBox(workName);

    if(!result[[workName, creatorName]]){
      result[[workName, creatorName]] = 0;
    }
    result[[workName, creatorName]] += 1;
  }
  
  for(var item in result){
    //Browser.msgBox(item);
    //Browser.msgBox(typeof item);
    
    if(item.indexOf(",") != -1){
      Browser.msgBox([item,result[item]]);
    }
  }

  //Browser.msgBox(result);
  
  //Browser.msgBox(result);
}


function caliculateRow(sheet, rowNum, result){
  
  var cells = sheet.getRange(rowNum,3,rowNum,13);

  for(var i=0; i < 5; i+=1){
    var workName = cells.getCell(1,i*2 + 1).getValue();
    var creatorName = cells.getCell(1,i*2 + 2).getValue();
    if( workName=="" ) break;

    Browser.msgBox(workName);

    if(!result[[workName, creatorName]]){
      result[[workName, creatorName]] = 0;
    }
    result[[workName, creatorName]] += 1;
  }
  
  return result;
}