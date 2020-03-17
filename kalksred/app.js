let currectInputIndex = 0;

const boxContainer = document.querySelector('.box-container');
const resultText = document.querySelector('#result');
const addButton = document.querySelector('.add-button');
let values = [];

const AddNewInput = () => {
  const newBoxHtml = `<div class="in-box" id="input${currectInputIndex}">\
  <div class="box-buttons">\
    <div onclick="RemoveInputBox(${currectInputIndex});" class="butt red"></div>\
    <div onclick="ToggleUsedInput(${currectInputIndex});" class="butt yellow"></div>\
  </div>\
  <div class="in-row">\
    <span class="field-label">Ocena:</span>\
    <input onClick="this.select();" class="small-num-in" type="text" onchange="ChangeValue(${currectInputIndex},this);" id="mark${currectInputIndex}" value = "0"/>\
  </div>\
\
    <div class="in-row">\
  <span class="field-label">Waga:</span>\
  <input onClick="this.select();" class="small-num-in" type="text" onchange="ChangeWeight(${currectInputIndex},this);" id="weight${currectInputIndex}" value = "1"/>\
  </div >\
</div > `
  // boxContainer.insertAdjacentHTML('beforeend', newBoxHtml);
  addButton.insertAdjacentHTML('beforebegin', newBoxHtml);
  values[currectInputIndex] = { val: 0, weight: 1, used: 1 };
  currectInputIndex++;
}

const ChangeValue = (x, caller) => {
  let addIn = 0;
  if (caller.value[caller.value.length - 1] == '+') {
    caller.value = caller.value.substring(0, caller.value.length - 1);
    addIn = 0.5;
  }
  if (caller.value[caller.value.length - 1] == '-') {
    caller.value = caller.value.substring(0, caller.value.length - 1);
    addIn = -0.25;
  }
  let val = Number(caller.value) + addIn;
  if (val == NaN) {
    caller.value = 0;
    values[x].val = 0;
    Calculate();
    return;
  }
  caller.value = val;
  values[x].val = val;
  Calculate();
}
const ChangeWeight = (x, caller) => {
  let val = Number(caller.value);
  if (val == NaN) {
    caller.value = 0;
    values[x].weight = 0;
    Calculate();
    return;
  }
  caller.value = val;
  values[x].weight = val;

  Calculate();
}

const Calculate = () => {
  let sumUpper = 0;
  let sumLower = 0;

  for (let i = 0; i < currectInputIndex; i++) {
    sumUpper += values[i].val * values[i].weight * values[i].used;
    sumLower += values[i].weight * values[i].used;
  }

  let outcome = sumUpper / Math.max(sumLower, 1);

  outcome *= 100;
  outcome = Math.round(outcome);
  outcome /= 100;
  // console.log(outcome);
  resultText.innerHTML = outcome;
}

const RemoveInputBox = x => {
  document.querySelector('#input' + x).classList.add('removed');
  values[x] = { val: 0, weight: 1, used: 0 };
  Calculate();
}

const ToggleUsedInput = x => {
  document.querySelector('#input' + x).classList.toggle('unused');
  values[x].used = !values[x].used;
  Calculate();
}