export const validate = (input) => {
    let errors = {};
   
    //name
    if (!input.name) errors.name = "name is required";
    else if (/(?=.*[0-9])/.test(input.name)) errors.name = "Must be letters only";
   
    //Height min&max
    if (!input.minHeight) errors.minHeight = "Minimum height is required";
    else if (/(?=[^0-9])/.test(input.minHeight)) errors.minHeight = "Must be numbers only";
    if (!input.maxHeight) errors.maxHeight = "Maximum height is required";
    else if (/(?=[^0-9])/.test(input.maxHeight)) errors.maxHeight = "Must be numbers only";
   
    //Weight min&max
    if (!input.minWeight) errors.minWeight = "Minimum weight is required";
    else if (/(?=[^0-9])/.test(input.minWeight)) errors.minWeight = "Must be numbers only";
    if (!input.maxWeight) errors.maxWeight = "Maximum weight is required";
    else if (/(?=[^0-9])/.test(input.maxWeight)) errors.maxWeight = "Must be numbers only";
   
    //Lifespan
    if (!input.life_span) errors.life_span = "Lifespan is required";
    else if (/(?=[^0-9])/.test(input.life_span)) errors.life_span = "Must be numbers only";

    //URL image
    if (!input.image) errors.image = "URL image is required";
    else if (/^[a-z]{0,255}$/.test(input.image)) errors.image = "URL value is too large";

    //type measure
    if (!input.typeWeight) errors.typeWeight = "Measure system is required";
    if (!input.typeHeight) errors.typeHeight = "Measure system is required";
  
    return errors;
}