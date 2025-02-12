function submit() {
    // clear error message
    const err = document.getElementById("error-message");
    clear_element(err);

    // get and validate total weight
    const weight = parseFloat(document.getElementById("weight").value);
    if (isNaN(weight)) {
        console.log("Error: No weight inputted");
        err.innerHTML = "Please enter a total weight";
        return;
    }

    // get and validate bar weight
    try {
        var bar = parseInt(document.getElementsByClassName("active-bar")[0].getAttribute("data-weight"));
    } catch (e) {
        if (e instanceof TypeError) {
            console.log("Error: No barbell selected");
            err.innerHTML = "Please select a barbell";
            return;
        } else {
            throw e;
        }
    }

    if (weight < bar) {
        console.log("Error: Weight is less than bar weight");
        err.innerHTML = "Weight is less than bar weight";
        return;
    }

    // get and validate plates
    var active_plates = document.getElementsByClassName("active-plate");
    if (active_plates.length == 0) {
        console.log("Error: No plates selected");
        err.innerHTML = "Please select plates";
        return;
    }
    var plates = [];
    for (var i = 0; i < active_plates.length; i++) {
        plates.push(parseFloat(active_plates[i].getAttribute("data-weight")));
    }

    const plate_count = calculatePlates(weight, bar, plates);
    console.log(plate_count);

    if (plate_count.remaining != 0) {
        console.log("Error: Weight is not filled by plates");
        err.innerHTML = `${plate_count.remaining} lbs not filled by plates`;
    }

    showPlates(plates, plate_count.plates);
}

function calculatePlates(weight, bar, plates) {
    var one_side = (weight - bar)/2;
    var plate_count = [];
    for (var i = 0; i < plates.length; i++) {
        plate_count.push(Math.floor(one_side/plates[i]));
        one_side = one_side%plates[i];
    }
    return {
        plates: plate_count,
        remaining: one_side*2
    };
}

function clear_element(element) {
    element.innerHTML = "";
}

function showPlates(plates, plate_count) {
    const wrapper = document.getElementById("plate-display");
    const text_wrapper = document.getElementById("plate-text");
    clear_element(wrapper);
    clear_element(text_wrapper);
    for (var i = 0; i < plates.length; i++) {
        for (var j = 0; j < plate_count[i]; j++) {
            // create plate image
            const plate = document.createElement("img");
            plate.classList.add("plate-image");
            if (plates[i] == 2.5) {
                plate.id = `plate-2-5-display`
                plate.src = "/static/images/2-5.webp";
            } else {
                plate.id = `plate-${plates[i]}-display`;
                plate.src = `/static/images/${plates[i]}.webp`;
            }
            wrapper.appendChild(plate);

            // create text
            const text = document.createElement("p");
            text.innerHTML = plates[i];
            text.classList.add("plate-text");
            if (plates[i] == 2.5) {
                text.id = `plate-2-5-text`;
            } else {
                text.id = `plate-${plates[i]}-text`;
            }
            text_wrapper.appendChild(text);
        }
    }
}