var firstName = document.querySelector('.first-name');
var lastName = document.querySelector('.last-name');
var male = document.querySelector('.male');
var female = document.querySelector('.female');
var address = document.querySelector('.address');
var checkBox = document.querySelector('#check');
var submitButton = document.querySelector('.submit-btn');
var cancelButton = document.querySelector('.cancel-btn');
var inputs = document.querySelectorAll('.input');
var errorText = document.querySelectorAll('.error-text');
var sucessMsg = document.querySelector('.sucess');
var nameReg = /^[a-z\s,']+$/i;
var addressReg = /^[a-z0-9 ,.'-]+$/i;


// Function for remove error on checkbox
checkBox.addEventListener('click', function () {
  checkboxError();
})

// Function for getting inputs and removing error (blur)
inputs.forEach(function (input) {
  input.addEventListener('blur', function () {
    formErrors(input);
  })
  input.addEventListener('keyup', function () {
    formErrors(input);
  })
})


// function for Error
function formErrors(input) {
  var inputError = input.parentElement.children;

  // Conditon for input error
  if (!input.value) {
    // input form
    input.classList.add('active');
    inputError[1].classList.add('error-active')
    inputError[1].innerText = "Enter Your " + input.name;
  } else {
    input.classList.remove('active');
    inputError[1].classList.remove('error-active')


    // VALIDATION
    // Condition for Address
    if (input.name == "Address") {
      if (addressReg.test(input.value)) {
        input.classList.remove('active');
        inputError[1].classList.remove('error-active')
      } else {
        input.classList.add('active');
        inputError[1].classList.add('error-active')
        inputError[1].innerText = "Symbol Not Allowed";
      }
    } else {
      // Condition for Names
      if (nameReg.test(input.value)) {
        input.classList.remove('active');
        inputError[1].classList.remove('error-active')
      } else {
        input.classList.add('active');
        inputError[1].classList.add('error-active')
        inputError[1].innerText = "Numbers and Symbol Not Allowed";
      }
    }
  }
}


// Function for Gender Error
// function genderError() {
//   var genderError = male.parentElement.parentElement.children;
//   if (male.checked || female.checked) {
//     genderError[1].classList.remove('error-active')
//   } else {
//     genderError[1].classList.add('error-active')
//     genderError[1].innerText = "Please Select Gender";
//   }
// }


// Function for Checkbox Error
function checkboxError() {
  var checkBoxError = checkBox.parentElement.children;
  if (!checkBox.checked) {
    checkBoxError[2].classList.add('error-active')
    checkBoxError[2].innerText = "Please Check Checkbox";
  } else {
    checkBoxError[2].classList.remove('error-active')
  }
}

// Events on Cancel button
cancelButton.addEventListener('click', function (e) {
  e.preventDefault()
  empty();
  if (checkBox.checked == true) {
    checkBox.checked = false;
  }
})

// Function to empty the data from form 
function empty() {
  inputs.forEach(function (input) {
    input.value = "";
    input.classList.remove('active');
  })
  if (checkBox.checked == true) {
    checkBox.checked = false;
  }
  errorText.forEach(function (error) {
    error.classList.remove("error-active")
  })
}

// Events on Submit button
submitButton.addEventListener('click', function (e) {
  e.preventDefault();
  // genderError();
  checkboxError();

  var activeError = document.querySelectorAll('.error-active');
  
  // Conditon for input in filled or not
  if (firstName.value && lastName.value && address.value && checkBox.checked && (male.checked || female.checked) && (activeError.length === 0)) {
    
    var div = document.createElement('div');
    div.classList.add('thank-you');
    div.innerHTML =  `<span class="icon">Form Submited</span>
    <p class ="text">Thank you for filling out your information!</p> 
    <span class="go-back">Go Back</span>`
    sucessMsg.append(div);
    var goBackBtn = document.querySelector('.go-back');
    var thankYou = document.querySelector('.thank-you');
    goBackBtn.addEventListener('click', function () {
      thankYou.remove();

    })
    setTimeout(function() {
      thankYou.remove();
    }, 2000);

    var data = document.querySelector('.datas')
    var li = document.createElement('li');
    li.innerHTML = `<ul class="data-row lists">
      <li class="data">${firstName.value}</li>
      <li class="data">${lastName.value}</li>
      <li class="data">${male.checked ? male.value : female.value}</li>
      <li class="data">${address.value}</li>
      <li><button class="btn edit">Edit</button></li>
      <li><button class="btn delete">Delete</button></li>
      </ul>`
    data.append(li);

    var editButton = document.querySelectorAll('.edit');
    var deleteButton = document.querySelectorAll('.delete');

    // Events on Edit Button
    editButton.forEach(function (edit) {
      edit.addEventListener('click', function (e) {
        e.preventDefault();
        var data = this.parentElement.parentElement.children;
        firstName.value = data[0].innerText;
        lastName.value = data[1].innerText;
        if (data[2].innerText === "Male") {
          male.checked = true;
        } else {
          female.checked = true;
        }
        address.value = data[3].innerText;
      })
    })

    // Events on Delete Button
    deleteButton.forEach(function (del) {
      del.addEventListener('click', function (e) {
        e.preventDefault();
        var ele = this.parentElement.parentElement.parentElement;
        ele.remove();
      })
    })
    empty();
  } else {
    inputs.forEach(function (input) {
      formErrors(input);
    })
  }
})