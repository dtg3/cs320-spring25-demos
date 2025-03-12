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

// Form controls for the Constraint API Example
// Event Listener that checks each time the control receives input
document.getElementById("constraint-email").addEventListener("input", contraint_email_validator);
document.getElementById("constraint-password").addEventListener("input", constraint_password_validator);

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

// Constraint API Validation
function contraint_email_validator(event) {
    var email_field = event.target;
    if (email_field.validity.typeMismatch) {
        email_field.setCustomValidity("This is not valid email address!");
    }
    else {
        email_field.setCustomValidity("");
    }
}

function constraint_password_validator(event) {
    var password_field = event.target;
    if (password_field.validity.valueMissing) {
        password_field.setCustomValidity("You must enter a password!");
    }
    else if (password_field.validity.tooShort) {
        password_field.setCustomValidity(`Password should be at least ${password_field.minLength} characters!`);
    }
    else {
        var result = valid_password_check(password_field.value);
        if (result == "special") {
            password_field.setCustomValidity("Password must have at least 1 special character!");
        }
        else if (result == "lower") {
            password_field.setCustomValidity("Password must have at least 1 lower case character!");
        }
        else if (result == "upper") {
            password_field.setCustomValidity("Password must have at least 1 upper case characcter!");
        }
        else if (result == "digit") {
            password_field.setCustomValidity("Password must have at least 1 digit!");
        }
        else {
            password_field.setCustomValidity("");
        }
    }
}

function valid_password_check(password_string) {
    const special_characters = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    
    if (check_contents(password_string, special_characters)) {
        return "special";
    }
    else if (check_contents(password_string, characters.toLowerCase())) {
        return "lower";
    }
    else if (check_contents(password_string, characters)) {
        return "upper";
    }
    else if (check_contents(password_string, digits)) {
        return "digit";
    }   
    return "none";
}

function check_contents(input_string, compare_string) {
    return compare_string.split('').some(compare_string => {
        return (!input_string.includes(compare_string));
    });
}