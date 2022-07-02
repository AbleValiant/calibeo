let typeSelect = document.getElementById("select-type");
let addBtn = document.getElementById("b-add");
let exportBtn = document.getElementById("b-export");
let optionsContainer = document.querySelector(".options-configurer .options");
let previewContainer = document.getElementById("source-prev");

handleTypeChange = (inputCode) => {
  optionsContainer.innerHTML = "";
  switch (inputCode) {
    case "0":
      optionsContainer.dataset.code = "0";
      optionsContainer.innerHTML = `<label for=name-backend>Name on backend: </label>
      <input id=name-backend>
      <label for=name-frontend>Name on FrontEnd: </label>
      <input id=name-frontend>
      <label for="min-check">Minimum Limit? </label>
    <input id="min-check" type="checkbox">
    <input type="number"id="min-number">

    <label for="max-check">Maximum Limit? </label>
    <input id="max-check" type="checkbox">
    <input type="number"id="max-number">`;
      break;
    case "1":
      optionsContainer.dataset.code = "1";
      optionsContainer.innerHTML = `<label for=name-backend>Name on backend: </label>
      <input id=name-backend>
      <label for=name-frontend>Name on FrontEnd: </label>
      <input id=name-frontend>
      <label for="min-check">Minimum Limit? </label>
    <input id="min-check" type="checkbox">
    <input type="number"id="min-number">

    <label for="max-check">Maximum Limit? </label>
    <input id="max-check" type="checkbox">
    <input type="number"id="max-number">`;
      break;
    case "2":
      optionsContainer.dataset.code = "2";
      optionsContainer.innerHTML = `<label for=name-backend>Name on backend: </label>
      <input id=name-backend>
      <label for=name-frontend>Name on FrontEnd: </label>
      <input id=name-frontend>`;
      break;
    case "3":
      optionsContainer.dataset.code = "3";
      optionsContainer.innerHTML = `<label for=name-backend>Name on backend: </label>
      <input id=name-backend>
      <label for=name-frontend>Name on FrontEnd: </label>
      <input id=name-frontend>
      <label for="min-check">Minimum Limit? </label>
    <input id="min-check" type="checkbox">
    <input type="number"id="min-number">

    <label for="max-check">Maximum Limit? </label>
    <input id="max-check" type="checkbox">
    <input type="number"id="max-number">`;
      break;
    case "4":
      optionsContainer.dataset.code = "4";
      optionsContainer.innerHTML = `<label for="name-backend">Name on backend: </label>
      <input id="name-backend" type="text">
  
      <label for="name-frontend">Name on FrontEnd: </label>
      <input id="name-frontend" type="text">`;
      break;
    default:
      optionsContainer.dataset.code = "";
      optionsContainer.innerHTML = "<h1>Error: Doesn't seem valid!</h1>";
  }
};

let elementsArray = [];

handleExport = () => {
  /* Get the text field */
  var copyText = document.getElementById("code-export");
  copyText.value = previewContainer.innerHTML;

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  alert("Copied the exported code!");
};

renderPreview = () => {
  previewContainer.innerHTML = "";
  console.log(elementsArray);
  new HtmlGenerator(elementsArray, previewContainer);
  applyExtraListeneres();
};

handleAddition = () => {
  let configurationCode = optionsContainer.dataset.code;

  let element = {
    tag: "div",
    att: { class: "custom_prop" },
    childs: [
      {
        tag: "label",
        att: {},
      },
    ],
  };

  let inputId =
    optionsContainer.querySelector("#name-frontend").value.replaceAll(" ", "") +
    Math.round(Math.random() * 1000);

  element.childs[0].att.for = inputId;
  element.childs[0].val =
    optionsContainer.querySelector("#name-frontend").value;

  if (
    configurationCode == 0 ||
    configurationCode == 1 ||
    configurationCode == 3
  ) {
    let inputElement = {
      tag: "input",
      att: {},
    };

    inputElement.att.name = `properties[${
      optionsContainer.querySelector("#name-backend").value
    }]`;

    let actualTag;
    if (configurationCode == 0) {
      actualTag = "text";
      inputElement.att.class = "cust_prop letters-only";

      // min max
      if (optionsContainer.querySelector("#min-check").checked) {
        inputElement.att.pattern = `.{${
          optionsContainer.querySelector("#min-number").value
        },}`;
        // inputElement.att.min =
        //   optionsContainer.querySelector("#min-number").value;
      }
      if (optionsContainer.querySelector("#max-check").checked) {
        inputElement.att.pattern = `.{0,${
          optionsContainer.querySelector("#max-number").value
        }}`;
        // inputElement.att.max =
        //   optionsContainer.querySelector("#max-number").value;
      }
      if (
        optionsContainer.querySelector("#max-check").checked &&
        optionsContainer.querySelector("#min-check").checked
      ) {
        inputElement.att.pattern = `.{${
          optionsContainer.querySelector("#min-number").value
        },${optionsContainer.querySelector("#max-number").value}}`;
        // inputElement.att.max =
        //   optionsContainer.querySelector("#max-number").value;
      }
    } else if (configurationCode == 1) {
      actualTag = "number";
      inputElement.att.class = "cust_prop";
      if (optionsContainer.querySelector("#min-check").checked) {
        inputElement.att.min =
          optionsContainer.querySelector("#min-number").value;
      }
      if (optionsContainer.querySelector("#max-check").checked) {
        inputElement.att.max =
          optionsContainer.querySelector("#max-number").value;
      }
    } else {
      actualTag = "text";
      inputElement.att.class = "cust_prop";
      // min max
      if (optionsContainer.querySelector("#min-check").checked) {
        inputElement.att.min =
          optionsContainer.querySelector("#min-number").value;
      }
      if (optionsContainer.querySelector("#max-check").checked) {
        inputElement.att.max =
          optionsContainer.querySelector("#max-number").value;
      }
    }

    inputElement.att.type = actualTag;

    // set max min

    element.childs.push(inputElement);
  }

  if (configurationCode == 2 || configurationCode == 4) {
    let inputElement = {
      tag: "input",
      att: {},
    };
    let actualTag;
    if (configurationCode == 2) {
      actualTag = "date";
      inputElement.att.class = "cust_prop";
    } else if (configurationCode == 4) {
      actualTag = "file";
      inputElement.att.class = "cust_prop";
    }

    inputElement.att.type = actualTag;

    inputElement.att.name = `properties[${
      optionsContainer.querySelector("#name-backend").value
    }]`;

    element.childs.push(inputElement);
  }
  elementsArray.push(element);
  renderPreview();
};

typeSelect.onchange = function () {
  handleTypeChange(this.value);
};

handleTypeChange("0");

addBtn.addEventListener("click", handleAddition);
exportBtn.addEventListener("click", handleExport);

// Functionality for various types of input

function applyExtraListeneres() {
  // letters only
  document
    .querySelectorAll("input.cust_prop.letters-only")
    .forEach(function (input) {
      input.oninput = function () {
        let reg = /^[a-z]+$/i;
        if (reg.test(this.value.charAt(this.value.length - 1))) {
          this.value = this.value;
        } else {
          this.value = this.value.slice(0, -1);
        }
      };
    });
}
