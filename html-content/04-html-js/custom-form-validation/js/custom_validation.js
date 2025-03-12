/*
    A simple JSON object stored in the variable colors

    The object consists of an array named colors with each
    element in the array being a dictionary with two elements
    name (the string that represents the color) and hex_value
    (a string represetnting the hexidecimal value of the color)
*/
let colors = [
    {"name":"Select a Color"},
    {"name":"red", "hex_value":"#ff0000"},
    {"name":"green", "hex_value":"#00ff00"},
    {"name":"blue", "hex_value":"#0000ff"},
    {"name":"black", "hex_value":"#000000"}
];

// Form controls for the Custom API Example
// Controls
let custom_email_control = document.getElementById("custom-email");
let custom_password_control = document.getElementById("custom-password");
let custom_form_control = document.getElementById("custom-validation");
// Error Spans
const email_error = document.getElementById("email-error");
const password_error = document.getElementById("password-error");
// Event Listener that checks each time the control receives input
custom_email_control.addEventListener("input", custom_email_validator);
custom_password_control.addEventListener("input", custom_password_validator);
custom_form_control.addEventListener("submit", custom_form_validator);


function load() {
    console.log("Run with loaded page!");
    setup_color_list();
}

function setup_color_list() {
    // Get the select element from the HTML document
    var color_select = document.getElementById("text_color");

    // Loop over the indexes of the colors in the JSON array
    for (var index = 0; index < colors.length; ++index) {
        // Create an option element to be added to the select element
        var option = document.createElement("option");
        // Assign the text shown to the use as the option
        option.innerHTML = colors[index].name;
        if (colors[index].name == "Select a Color") {
            // Setup the default option so people know to select it
            option.selected = true;
            option.value = null;
            option.disabled = true;
        }
        else {
            // Add the value that actually represents that option
            option.value = colors[index].hex_value;
        }
        // Add the option element to the select element
        color_select.appendChild(option);
    }
}

// Function to trigger when the onchange event occurs for the
//  select element for changing the text color
function change_color(event) {
    // Determine the target of the event
    var selectElement = event.target;
    // Acquire the text element that needs a color change
    var color_text = document.getElementById("color_text");
    // Modify the elements color style
    color_text.style.color = selectElement.value;
}

// Custom Validator
function custom_email_validator(event) {
    if (custom_email_control.validity.valid) {
        email_error.textContent = "";
        email_error.className = "error";
    }
    else {
        show_email_error();
    }
}

function custom_password_validator(event) {
    clear_password_errors();
    var error_message = custom_valid_password_check(custom_password_control.value);
    if (custom_password_control.validity.valid && !error_message) {
        password_error.textContent = "";
        password_error.className = "error";
    }
    else {
        show_password_error(error_message);
    }
}

function custom_form_validator(event) {
    if (!custom_email_control.validity.valid) {
        show_email_error();
        event.preventDefault();
    }
    clear_password_errors();
    var error_message = custom_valid_password_check(custom_password_control.value);
    if (!custom_password_control.validity.valid || error_message) {
        show_password_error(error_message);
        event.preventDefault();
    }
}

function show_email_error() {
    if (custom_email_control.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        email_error.textContent = "You need to enter an e-mail address";
    } else if (custom_email_control.validity.typeMismatch) {
        // If the field doesn't contain an email address,
        // display the following error message.
        email_error.textContent = "Entered value is not a valid e-mail address";
    }
    email_error.className = "error active";
}

function clear_password_errors() {
    while(password_error.firstChild) {
        password_error.removeChild(password_error.firstChild);
    }
}

function show_password_error(error_message) {
    password_error.appendChild(error_message);
    password_error.className = "error active";
}

function custom_valid_password_check(password_string) {
    const special_characters = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    
    var error_message = null;
    var unordered_list = document.createElement('ul');

    if (custom_password_control.validity.valueMissing) {
        var list_element = document.createElement("li");
        list_element.textContent = "cannot be empty";
        unordered_list.appendChild(list_element);
    }
    if (password_string.length < custom_password_control.minLength) {
        var list_element = document.createElement("li");
        list_element.textContent = `must be at least ${custom_password_control.minLength} characters`;
        unordered_list.appendChild(list_element);
    }
    if (!check_contents(password_string, special_characters)) {
        var list_element = document.createElement("li");
        list_element.textContent = "needs at least one special character";
        unordered_list.appendChild(list_element);
    }
    if (!check_contents(password_string, characters.toLowerCase())) {
        var list_element = document.createElement("li");
        list_element.textContent = "needs at least one lowercase character";
        unordered_list.appendChild(list_element);
    }
    if (!check_contents(password_string, characters)) {
        var list_element = document.createElement("li");
        list_element.textContent = "needs at least one uppercase character";
        unordered_list.appendChild(list_element);
    }
    if (!check_contents(password_string, digits)) {
        var list_element = document.createElement("li");
        list_element.textContent = "needs at least one digit";
        unordered_list.appendChild(list_element);
    }
    
    if (unordered_list.getElementsByTagName("li").length > 0) {
        error_message = unordered_list;
    }

    return error_message;
}

function check_contents(input_string, compare_string) {
    return compare_string.split('').some(compare_string => {
        return (!input_string.includes(compare_string));
    });
}