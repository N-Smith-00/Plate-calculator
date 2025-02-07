function submit() {
    // clear error message
    const err = document.getElementById("error-message");
    err.innerHTML = "";

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

    // TODO: calculate the plates needed
    // TODO: show error message if the weight is not filled by plates
}